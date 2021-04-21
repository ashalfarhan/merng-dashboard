import { Box, Flex, Heading } from "@chakra-ui/layout";
import { FormattedMessage } from "react-intl";
import EmailLoginForm from "../components/EmailLoginForm";
import UsernameLoginForm from "../components/UsernameLoginForm";
import { useState } from "react";
import { LOGIN } from "../@types/enums";
import { Button } from "@chakra-ui/button";
import { isAuth } from "../store/slices/auth";
import { useSelector } from "../store";
import { Redirect } from "react-router";

export default function LoginPage() {
  const [loginWith, setLoginWith] = useState(LOGIN.EMAIL);
  const isLoggedIn = useSelector(isAuth);
  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Flex w="full" h="70vh" direction="column" align="center" justify="center">
      <Box w="sm">
        <Box>
          <Heading>
            <FormattedMessage id="login.heading" />
          </Heading>
          <Box mt="4">
            {loginWith === LOGIN.EMAIL ? (
              <>
                <EmailLoginForm />
                <Button
                  mt="4"
                  w="full"
                  onClick={() => setLoginWith(LOGIN.USERNAME)}
                >
                  Login with username
                </Button>
              </>
            ) : (
              <>
                <UsernameLoginForm />
                <Button
                  mt="4"
                  w="full"
                  onClick={() => setLoginWith(LOGIN.EMAIL)}
                >
                  Login with email
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
