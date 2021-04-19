import { Box, Heading, Text } from "@chakra-ui/layout";
import { Link, useLocation } from "react-router-dom";

export default function Page404() {
  const { pathname } = useLocation();
  return (
    <Box>
      <Heading>Oops, there's no page for {pathname}</Heading>
      <Text>
        Back to <Link to="/">Home</Link>
      </Text>
    </Box>
  );
}
