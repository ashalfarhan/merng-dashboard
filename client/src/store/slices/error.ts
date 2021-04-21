import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface State {
  isError: boolean;
  message: null | any;
}

const initialState: State = {
  isError: false,
  message: "Something went wrong",
};

export const error = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, { payload }) => {
      state.isError = true;
      state.message = payload;
    },
    closeError: (state) => {
      state.isError = false;
    },
  },
});

export const { setError, closeError } = error.actions;
export const getError = (state: RootState) => state.error;
export default error.reducer;
