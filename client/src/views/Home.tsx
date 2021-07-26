import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store";
import { isAuth } from "../store/slices/auth";

export default function HomePage() {
  const { formatMessage } = useIntl();
  const isLoggedIn = useAppSelector(isAuth);
  return (
    <Box
      minH="60vh"
      display="flex"
      alignItems="center"
      flexDir="column"
      justifyContent="center"
    >
      <Heading textAlign="center">
        {formatMessage({ id: "welcome.title" })}
      </Heading>
      {isLoggedIn ? (
        <Text fontSize="24px" textAlign="center">
          {formatMessage({ id: "welcome.subTitle" }) + " "}
          <Button fontSize="24px" variant="link">
            <Link to="/dashboard">dashboard</Link>
          </Button>
        </Text>
      ) : (
        <Text fontSize="24px" textAlign="center">
          {formatMessage({ id: "welcome.please" }) + " "}
          <Button fontSize="24px" variant="link">
            <Link to="/login">login</Link>
          </Button>{" "}
          {formatMessage({ id: "welcome.ifContinue" })}
        </Text>
      )}
    </Box>
  );
}
