import { Button } from "@chakra-ui/button";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { useSelector } from "../store";
import { isAuth } from "../store/slices/auth";

export default function HomePage() {
  const isLoggedIn = useSelector(isAuth);
  return (
    <Box
      minH="60vh"
      display="flex"
      alignItems="center"
      flexDir="column"
      justifyContent="center"
    >
      <Heading textAlign="center">
        <FormattedMessage id="welcome.title" />
      </Heading>
      {isLoggedIn ? (
        <Text>
          <FormattedMessage id="welcome.subTitle" />
          <Link to="/dashboard"> dashboard</Link>
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
