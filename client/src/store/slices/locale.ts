import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { LOCALES } from "../../@types/enums";

interface State {
  lang: LOCALES | string;
}
const initialState: State = {
  lang: localStorage.getItem("lang") || LOCALES.EN,
};

const localeReducer = createSlice({
  name: "locale",
  initialState,
  reducers: {
    switchLocale: (state, { payload }: PayloadAction<LOCALES>) => {
      localStorage.setItem("lang", payload);
      state.lang = localStorage.getItem("lang") || payload;
    },
  },
});
export const { switchLocale } = localeReducer.actions;
export const getLocale = (state: RootState) => state.locale.lang;
export default localeReducer.reducer;
