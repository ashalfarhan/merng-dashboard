import { Button } from "@chakra-ui/button";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { Link, useLocation } from "react-router-dom";

export default function Page404() {
  const { pathname } = useLocation();
  return (
    <Box px="12" mt="8" minH="80vh">
      <Heading>Oops, there's no page for {pathname}</Heading>
      <Text>
        Back to{" "}
        <Button variant="link">
          {" "}
          <Link to="/">Home</Link>
        </Button>
      </Text>
    </Box>
  );
}
