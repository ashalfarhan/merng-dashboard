import { Box, Text } from "@chakra-ui/layout";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { EmailLogin } from "../@types";
import { emailLoginSchema } from "../helpers/validation";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { MeDocument, useLoginWithEmailMutation } from "../generated/graphql";
import { useHistory } from "react-router";
import { useDispatch } from "../store";
import { setLogin } from "../store/thunk/login";
import { setError } from "../store/slices/error";

export default function EmailLoginForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [login, { loading }] = useLoginWithEmailMutation({
    refetchQueries: [
      {
        query: MeDocument,
      },
    ],
    onError: (e) => {
      dispatch(setError(e.message));
    },
    onCompleted: ({ loginWithEmail }) => {
      if (!loginWithEmail) {
        return dispatch(
          setError(
            "Cannot retrive the data after logged you in, please try again"
          )
        );
      }
      const { token, user } = loginWithEmail;
      dispatch(setLogin({ token, user }));
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
      try {
        await login({
          variables: { ...value },
        });
      } catch (e) {
        dispatch(setError(e.message));
      }
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
    </Box>
  );
}
