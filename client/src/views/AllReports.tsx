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
import { formatDate } from "../helpers/dateFormatter";
import { getLocale } from "../store/slices/locale";

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
                <Th>Name</Th>
                <Th>Reporter</Th>
                <Th>Reported On</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.getAllReports?.map((report, idx) => (
                <Tr key={report._id}>
                  <Td>{idx + 1}</Td>
                  <Td>{report.name}</Td>
                  <Td>{report.reporter.name}</Td>
                  <Td>{formatDate(report.createdAt, locale)}</Td>
                </Tr>
              ))}
            </Tbody>
            <TableCaption>
              Last update {new Date().toLocaleString()}
            </TableCaption>
          </Table>
        )}
      </Box>
    </Layout>
  );
}
