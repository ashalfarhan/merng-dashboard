import { Box, Flex, Heading } from "@chakra-ui/layout";
import { useIntl } from "react-intl";
import EmailLoginForm from "../components/forms/EmailLoginForm";
import UsernameLoginForm from "../components/forms/UsernameLoginForm";
import { useState } from "react";
import { LOGIN } from "../@types/enums";
import { Button } from "@chakra-ui/button";
import { isAuth } from "../store/slices/auth";
import { useSelector } from "../store";
import { Redirect } from "react-router";

export default function LoginPage() {
  const { formatMessage } = useIntl();
  const [loginWith, setLoginWith] = useState(LOGIN.EMAIL);
  const isLoggedIn = useSelector(isAuth);
  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Flex w="full" h="70vh" direction="column" align="center" justify="center">
      <Box w="sm">
        <Box>
          <Heading>{formatMessage({ id: "login.heading" })}</Heading>
          <Box mt="4">
            {loginWith === LOGIN.EMAIL ? (
              <>
                <EmailLoginForm />
                <Button
                  mt="4"
                  w="full"
                  onClick={() => setLoginWith(LOGIN.USERNAME)}
                >
                  {formatMessage({ id: "login.withUsername" })}
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
                  {formatMessage({ id: "login.withEmail" })}
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
