import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/table";
import { Box } from "@chakra-ui/layout";
import Layout from "../components/Layout";
import { useGetAllReportsQuery } from "../generated/graphql";
import { Spinner } from "@chakra-ui/spinner";
import { useDispatch, useSelector } from "../store";
import { setError } from "../store/slices/error";
import { getLocale } from "../store/slices/locale";
import moment from "moment";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

export default function AllReports() {
  const dispatch = useDispatch();
  const locale = useSelector(getLocale);
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
                <Th>
                  <FormattedMessage id="report.nameLabel" />
                </Th>
                <Th>
                  <FormattedMessage id="report.reporterLabel" />
                </Th>
                <Th>
                  <FormattedMessage id="report.reportedOnLabel" />
                </Th>
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
              <FormattedMessage id="lastUpdateLabel" />{" "}
              {new Date().toLocaleString()}
            </TableCaption>
          </Table>
        )}
      </Box>
    </Layout>
  );
}
