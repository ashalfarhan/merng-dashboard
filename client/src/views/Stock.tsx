import {
  Box,
  Heading,
  ListItem,
  UnorderedList,
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
import { Layout } from "../components/common";
import { useGetStockQuery } from "../generated/graphql";
import { useAppDispatch } from "../store";
import { setError } from "../store/slices/error";

export default function Stock() {
  const { formatMessage } = useIntl();
  const dispatch = useAppDispatch();
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
                  <Th>{formatMessage({ id: "Stuff" })}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.getStock?.map((report, idx) => (
                  <Tr key={report._id}>
                    <Td>{idx + 1}</Td>
                    <Td>{report.name}</Td>
                    <Td>{report.reporter.name}</Td>
                    <Td>{moment(report.createdAt).format("ddd DD-MM-YYYY")}</Td>
                    <Td>
                      <UnorderedList>
                        {report.goods.map((item) => (
                          <ListItem>{item.name}</ListItem>
                        ))}
                      </UnorderedList>
                    </Td>
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
