import {
  Input,
  FormControl,
  FormLabel,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { UsernameLogin } from "../../@types";
import { usernameLoginSchema } from "../../helpers";
import { useHistory } from "react-router";
import { useAppDispatch } from "../../store";
import { useLoginWithUsernameMutation } from "../../generated/graphql";
import { setError } from "../../store/slices/error";
import { setLogin } from "../../store/thunk/login";

export default function UsernameLoginForm() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [login, { loading, error }] = useLoginWithUsernameMutation({
    onCompleted: ({ loginWithUsername }) => {
      if (!loginWithUsername || error) {
        return dispatch(setError("Invalid username or password"));
      }
      const { token, user } = loginWithUsername;
      dispatch(setLogin({ token, user }));
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
      try {
        await login({
          variables: { ...value },
        });
      } catch (error) {
        dispatch(setError(error.message));
        console.error(error.message);
      }
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
          {errors.username && <Text>{errors.username.message}</Text>}
        </FormControl>
        <FormControl mt={6}>
          <FormLabel>Password</FormLabel>
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
