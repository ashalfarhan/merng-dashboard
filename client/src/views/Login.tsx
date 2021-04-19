import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { FormEvent, useState } from "react";
import { useHistory } from "react-router";
import auth from "../helpers/auth";

export default function LoginPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const history = useHistory();
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimeout(() => {
      alert(JSON.stringify({ email, password }, null, 2));
      auth.login();
      history.push("/");
    }, 300);
  };
  return (
    <Flex w="full" h="70vh" direction="column" align="center" justify="center">
      <Box w="sm">
        <Box>
          <Heading>Login</Heading>
        </Box>
        <Box mt="8">
          <form onSubmit={handleLogin}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="example@mail.com"
              />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="***********"
              />
            </FormControl>
            <Button w="full" mt={4} type="submit">
              Sign In
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}
