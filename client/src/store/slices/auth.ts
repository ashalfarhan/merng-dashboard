import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { User } from "../../@types";
import { isValid } from "../../helpers/auth";
import { setLogin } from "../thunk/login";

interface State {
  user: User | null;
  token?: string | null;
}

const initialState: State = {
  user: JSON.parse(localStorage.getItem("user") as string) || null,
  token: localStorage.getItem("fmas"),
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<string>) => {
      localStorage.setItem("fmas", JSON.stringify(payload));
      return {
        ...state,
        token: payload,
      };
    },
    removeToken: (state) => {
      localStorage.removeItem("fmas");
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
        token: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setLogin.fulfilled, (state, { payload }) => {
      if (payload) {
        localStorage.setItem("user", JSON.stringify(payload.user));
        return {
          ...state,
          user: payload.user,
        };
      }
      return {
        ...state,
      };
    });
  },
});

export const { setToken, removeToken } = authReducer.actions;

export const getUser = (state: RootState) => state.auth.user;

export const isAuth = (state: RootState) => {
  if (state.auth.token) {
    return isValid(state.auth.token);
  }
  return isValid(localStorage.getItem("fmas"));
};

export default authReducer.reducer;
