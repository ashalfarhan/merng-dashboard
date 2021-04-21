import { Box, Text } from "@chakra-ui/layout";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { UsernameLogin } from "../@types";
import { usernameLoginSchema } from "../helpers/validation";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import { useHistory } from "react-router";
import { useDispatch } from "../store";
import { useLoginWithUsernameMutation } from "../generated/graphql";
import { setToken } from "../store/slices/auth";

export default function UsernameLoginForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const dispatch = useDispatch();
  const [login, { loading, error }] = useLoginWithUsernameMutation({
    onCompleted: ({ loginWithUsername }) => {
      if (!loginWithUsername || error) {
        return onOpen();
      }
      dispatch(setToken(loginWithUsername.token));
      setTimeout(() => {
        history.push("/");
      }, 400);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<UsernameLogin>({
    resolver: yupResolver(usernameLoginSchema),
    mode: "onChange",
  });
  const handleLogin = async (value: UsernameLogin) => {
    if (isDirty && isValid) {
      await login({
        variables: { ...value },
      });
    }
  };
  return (
    <Box mt="8">
      <form onSubmit={handleSubmit(handleLogin)}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            {...register("username")}
            id="username"
            placeholder="johndoe2021"
          />
          <Text>{errors.username?.message}</Text>
        </FormControl>
        <FormControl mt={6}>
          <FormLabel>Password</FormLabel>
          <Input
            {...register("password")}
            id="password"
            type="password"
            placeholder="***********"
          />
          <Text>{errors.password?.message}</Text>
        </FormControl>
        <Button
          isLoading={loading && isDirty}
          isDisabled={!isValid}
          w="full"
          mt={4}
          type="submit"
        >
          Submit
        </Button>
      </form>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{"Oops"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{"Usrname or password is invalid"}</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>{"Ok"}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
