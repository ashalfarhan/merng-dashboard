import {
  Box,
  Heading,
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import moment from "moment";
import { Layout } from "../components/common";
import { useLocale } from "../context/LocaleContext";
import { useGetSalesQuery } from "../generated/graphql";
import { useAppDispatch } from "../store";
import { setError } from "../store/slices/error";

export default function Stock() {
  const { t } = useLocale();
  const dispatch = useAppDispatch();
  const { data, loading } = useGetSalesQuery({
    onError: (e) => {
      dispatch(setError(e.message));
    },
  });

  return (
    <Layout>
      <Box>
        <Heading>{t({ id: "menu.sales" })}</Heading>
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
                {data.getSales?.map((report, idx) => (
                  <Tr key={report._id}>
                    <Td>{idx + 1}</Td>
                    <Td>{report.name}</Td>
                    <Td>{report.reporter.name}</Td>
                    <Td>{moment(report.createdAt).format("ddd DD-MM-YYYY")}</Td>
                  </Tr>
                ))}
              </Tbody>
              <TableCaption>
                {t({ id: "lastUpdateLabel" })}
                {new Date().toLocaleString()}
              </TableCaption>
            </Table>
          )}
        </Box>
      </Box>
    </Layout>
  );
}
