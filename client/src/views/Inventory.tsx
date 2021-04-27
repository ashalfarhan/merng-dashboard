import { Box, Heading } from "@chakra-ui/layout";
import {
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
import { useGetInventoryQuery } from "../generated/graphql";
import { useDispatch } from "../store";
import { setError } from "../store/slices/error";

export default function Stock() {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const { data, loading } = useGetInventoryQuery({
    onError: (e) => {
      dispatch(setError(e.message));
    },
  });

  return (
    <Layout>
      <Box>
        <Heading>{formatMessage({ id: "menu.inventory" })}</Heading>
        <Box height="full" display="flex">
          {!data || loading ? (
            <Spinner m="auto" />
          ) : (
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>{formatMessage({ id: "report.nameLabel" })}</Th>
                  <Th>{"Amount"}</Th>
                  <Th>{"Price"}</Th>
                  <Th>{formatMessage({ id: "report.reportedOnLabel" })}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.getInventory?.map((report, idx) => (
                  <Tr key={report._id}>
                    <Td>{idx + 1}</Td>
                    <Td>{report.name}</Td>
                    <Td>{report.amount}</Td>
                    <Td>{report.price}</Td>
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
