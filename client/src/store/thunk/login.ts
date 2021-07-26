import { createAsyncThunk } from "@reduxjs/toolkit";
import { Token } from "../../helpers/auth";
import jwtDecode from "jwt-decode";
import { setToken } from "../slices/auth";
import { setError } from "../slices/error";
import { User } from "../../@types";

interface Params {
  token: string;
  user: User;
}

export const setLogin = createAsyncThunk(
  "auth/setLogin",
  async ({ token, user }: Params, { dispatch }) => {
    try {
      const { userId, isAdmin } = jwtDecode<Token>(token);
      dispatch(setToken(token));
      return { userId, isAdmin, user };
    } catch (error) {
      dispatch(setError(error.message));
      console.log(error.message);
    }
  },
);
