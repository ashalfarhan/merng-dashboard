import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { User } from "../../@types";
import { isValid } from "../../helpers/auth";
import { setLogin } from "../thunk/login";

interface State {
  // isLoggedIn: boolean;
  user: User | null;
  token?: string | null;
}

const initialState: State = {
  // isLoggedIn: isValid(localStorage.getItem("fmas")),
  // @ts-ignore
  user: JSON.parse(localStorage.getItem("user")),
  token: localStorage.getItem("fmas"),
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<string>) => {
      localStorage.setItem("fmas", String(payload));
      state = {
        ...state,
        token: localStorage.getItem("fmas") || payload,
        // isLoggedIn: isValid(payload),
      };
    },
    removeToken: (state) => {
      localStorage.removeItem("fmas");
      localStorage.removeItem("user");
      // state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: {
    [setLogin.fulfilled.type]: (state, { payload }) => {
      localStorage.setItem("user", JSON.stringify(payload.user));
      // @ts-ignore
      state.user = JSON.parse(localStorage.getItem("user")) || payload.user;
    },
    [setLogin.rejected.type]: (state) => {
      localStorage.removeItem("user");
      // state.isLoggedIn = false;
    },
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
