import { Button } from "@chakra-ui/button";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import useAuth from "../helpers/auth";

export default function HomePage() {
  const { isLoggedIn } = useAuth();
  return (
    <Box
      minH="60vh"
      display="flex"
      alignItems="center"
      flexDir="column"
      justifyContent="center"
    >
      <Heading textAlign="center">Welcome!</Heading>
      {isLoggedIn ? (
        <Text>
          Now you can go to <Link to="/dashboard"> dashboard</Link>
        </Text>
      ) : (
        <Text fontSize="24px">
          Please{" "}
          <Button fontSize="24px" variant="link">
            <Link to="/login">login</Link>
          </Button>{" "}
          if you want to continue
        </Text>
      )}
    </Box>
  );
}
