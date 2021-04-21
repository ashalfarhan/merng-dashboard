import * as yup from "yup";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const emailLoginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegex, "Should be valid email")
    .required("Please enter email"),
  password: yup.string().required("Please enter password"),
});

export const usernameLoginSchema = yup.object().shape({
  username: yup.string().required("Please enter email"),
  password: yup.string().required("Please enter password"),
});
