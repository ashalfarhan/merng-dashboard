import { Box } from "@chakra-ui/layout";
import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/table";
import { useEffect, useState } from "react";
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default function AllUsers() {
  const [users, setUsers] = useState<User[] | []>([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const json = await response.json();
      setUsers(json);
    };
    getPosts();
  }, []);

  return (
    <Box>
      <Table variant="striped">
        <TableCaption>Updated at {new Date().toDateString()}</TableCaption>
        <Thead>
          <Th>No.</Th>
          <Th>Name</Th>
          <Th>Username</Th>
          <Th>Email</Th>
        </Thead>
        <Tbody>
          {users.map((user: User) => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.name}</Td>
              <Td>{user.username}</Td>
              <Td>{user.email}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
