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
import { Spinner } from "@chakra-ui/spinner";
import Layout from "../components/common/Layout";
import { useGetAllUsersQuery } from "../generated/graphql";
import { useDispatch } from "../store";
import { setError } from "../store/slices/error";

export default function AllUsers() {
  const dispatch = useDispatch();
  const { data, loading } = useGetAllUsersQuery({
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
                <Th>Username</Th>
                <Th>Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.getAllUsers?.map((user, idx) => (
                <Tr key={user._id}>
                  <Td>{idx + 1}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.username}</Td>
                  <Td>{user.email}</Td>
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
