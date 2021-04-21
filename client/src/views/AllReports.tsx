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
import Layout from "../components/Layout";

interface Report {
  id: number;
  name: string;
  email: string;
}

export default function AllReports() {
  const [posts, setPosts] = useState<Report[] | []>([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      );
      const json = await response.json();
      setPosts(json.slice(0, 24));
    };
    getPosts();
  }, []);

  return (
    <Layout>
      <Box>
        <Table variant="striped">
          <TableCaption>Updated at {new Date().toDateString()}</TableCaption>
          <Thead>
            <Th>No.</Th>
            <Th>Name</Th>
            <Th>Reporter</Th>
          </Thead>
          <Tbody>
            {posts.map((post: Report) => (
              <Tr key={post.id}>
                <Td>{post.id}</Td>
                <Td>{post.name}</Td>
                <Td>{post.email}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Layout>
  );
}
