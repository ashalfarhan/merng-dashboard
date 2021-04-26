import { Box, Heading } from "@chakra-ui/layout";
import {
  Link,
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
import { useIntl } from "react-intl";
import Layout from "../components/common/Layout";
import { useGetStockQuery } from "../generated/graphql";
import { useDispatch } from "../store";
import { setError } from "../store/slices/error";

export default function Stock() {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const { data, loading } = useGetStockQuery({
    onError: (e) => {
      dispatch(setError(e.message));
    },
  });

  return (
    <Layout>
      <Box>
        <Heading>{formatMessage({ id: "menu.stock" })}</Heading>
        <Box height="full" display="flex">
          {!data || loading ? (
            <Spinner m="auto" />
          ) : (
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>{formatMessage({ id: "report.nameLabel" })}</Th>
                  <Th>{formatMessage({ id: "report.reporterLabel" })}</Th>
                  <Th>{formatMessage({ id: "report.reportedOnLabel" })}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.getStock?.map((report, idx) => (
                  <Tr key={report._id}>
                    <Td>{idx + 1}</Td>
                    <Td>
                      <Link to={`/report/${report._id}`}>{report.name}</Link>
                    </Td>
                    <Td>{report.reporter.name}</Td>
                    <Td>{moment(report.createdAt).format("ddd DD-MM-YYYY")}</Td>
                  </Tr>
                ))}
              </Tbody>
              <TableCaption>
                {formatMessage({ id: "lastUpdateLabel" })}
                {new Date().toLocaleString()}
              </TableCaption>
            </Table>
          )}
        </Box>
      </Box>
    </Layout>
  );
}
