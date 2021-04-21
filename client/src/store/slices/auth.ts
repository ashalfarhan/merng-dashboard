import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { isValid } from "../../helpers/auth";

interface State {
  isLoggedIn: boolean;
  userId: string | null;
  isAdmin: boolean;
  token?: string | null;
}

const initialState: State = {
  isLoggedIn:
    // @ts-ignore
    isValid(localStorage.getItem("fmas")),
  userId: null,
  isAdmin: false,
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
        token: localStorage.getItem("fmas"),
        isLoggedIn: isValid(payload),
      };
    },
    removeToken: (state) => {
      localStorage.removeItem("fmas");
      state.isLoggedIn = false;
      state.token = null;
    },
    setLogin: (state) => {
      if (localStorage.getItem("fmas")) {
        // @ts-ignore
        state.isLoggedIn = isValid(localStorage.getItem("fmas"));
      }
      state.isLoggedIn = false;
    },
  },
});

export const { setToken, removeToken, setLogin } = authReducer.actions;
export const isAuth = (state: RootState) =>
  state.auth.token ? isValid(state.auth.token) : state.auth.isLoggedIn;
export default authReducer.reducer;
