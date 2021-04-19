import { Box, Heading } from "@chakra-ui/layout";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Box>
      <Heading textAlign="center">
        Welcome! now you can go to <Link to="/dashboard"> dashboard</Link>
      </Heading>
    </Box>
  );
}
