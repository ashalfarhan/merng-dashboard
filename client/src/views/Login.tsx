import { Button, Spinner, Box, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { LOGIN } from "../@types";
import { isAuth } from "../store/slices/auth";
import { useAppSelector } from "../store";
import { Redirect } from "react-router";
import Loadable from "react-loadable";
import { useIntl } from "react-intl";

const EmailLoginForm = Loadable({
  loader: () => import("../components/forms/EmailLoginForm"),
  loading: Spinner,
});

const UsernameLoginForm = Loadable({
  loader: () => import("../components/forms/UsernameLoginForm"),
  loading: Spinner,
});

export default function LoginPage() {
  const [loginWith, setLoginWith] = useState(LOGIN.EMAIL);
  const { formatMessage } = useIntl();
  const isLoggedIn = useAppSelector(isAuth);
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
