import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Box, Text } from "@chakra-ui/layout";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { EmailLogin } from "../@types";
import { emailLoginSchema } from "../helpers/validation";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useLoginWithEmailMutation } from "../generated/graphql";
import { useHistory } from "react-router";
import { useDispatch } from "../store";
import { setToken } from "../store/slices/auth";
import { useDisclosure } from "@chakra-ui/hooks";

export default function EmailLoginForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const dispatch = useDispatch();
  const [login, { loading, error }] = useLoginWithEmailMutation({
    onCompleted: ({ loginWithEmail }) => {
      if (!loginWithEmail || error) {
        return onOpen();
      }
      dispatch(setToken(loginWithEmail.token));
      setTimeout(() => {
        history.push("/");
      }, 400);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<EmailLogin>({
    resolver: yupResolver(emailLoginSchema),
    mode: "onChange",
  });
  const handleLogin = async (value: EmailLogin) => {
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
          <FormLabel>{"Email"}</FormLabel>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="example@mail.com"
          />
          {errors.email && <Text>{errors.email.message}</Text>}
        </FormControl>
        <FormControl mt={6}>
          <FormLabel>{"Password"}</FormLabel>
          <Input
            {...register("password")}
            id="password"
            type="password"
            placeholder="***********"
          />
          {errors.password && <Text>{errors.password.message}</Text>}
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
          <ModalBody>{"Email or password is invalid"}</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>{"Ok"}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
