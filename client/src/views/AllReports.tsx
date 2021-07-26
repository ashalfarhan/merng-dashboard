import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Box,
  Thead,
  Tr,
  Spinner,
} from "@chakra-ui/react";
import { Layout } from "../components/common";
import { useGetAllReportsQuery } from "../generated/graphql";
import { useAppDispatch } from "../store";
import { setError } from "../store/slices/error";
// import { getLocale } from "../store/slices/locale";
import moment from "moment";
import { Link } from "react-router-dom";
// import { useIntl } from "react-intl";
import { useLocale } from "../context/LocaleContext";

export default function AllReports() {
  const dispatch = useAppDispatch();
  const { locale, t } = useLocale();
  // const locale = useAppSelector(getLocale);
  const { data, loading } = useGetAllReportsQuery({
    onError: (e) => {
      dispatch(setError(e.message));
    },
  });
  return (
    <Layout>
      <Box height="full" display="flex">
        {!data || loading ? (
          <Spinner m="auto" />
        ) : (
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>No.</Th>
                <Th>{t({ id: "report.nameLabel" })}</Th>
                <Th>{t({ id: "report.reporterLabel" })}</Th>
                <Th>{t({ id: "report.reportedOnLabel" })}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.getAllReports?.map((report, idx) => (
                <Tr key={report._id}>
                  <Td>{idx + 1}</Td>
                  <Td>
                    <Link to={`/report/${report._id}`}>{report.name}</Link>
                  </Td>
                  <Td>{report.reporter.name}</Td>
                  <Td>
                    {moment(report.createdAt)
                      .locale(locale)
                      .format("ddd DD-MM-YYYY")}
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <TableCaption>
              {t({ id: "lastUpdateLabel" }) + " " + new Date().toLocaleString()}
            </TableCaption>
          </Table>
        )}
      </Box>
    </Layout>
  );
}
