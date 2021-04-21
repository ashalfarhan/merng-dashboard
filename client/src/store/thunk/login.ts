import { createAsyncThunk } from "@reduxjs/toolkit";
import { Token } from "../../helpers/auth";
import jwtDecode from "jwt-decode";
import { setToken } from "../slices/auth";
import { setError } from "../slices/error";

export const setLogin = createAsyncThunk(
  "auth/setLogin",
  async (token: string, { dispatch }) => {
    try {
      const { userId, isAdmin } = jwtDecode<Token>(token);
      dispatch(setToken(token));
      return { userId, isAdmin };
    } catch (error) {
      dispatch(setError(error.message));
      console.log(error.message);
      return error;
    }
  }
);
