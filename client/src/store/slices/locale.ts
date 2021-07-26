// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "..";
// import { LOCALE } from "../../@types/enums";

// interface State {
//   lang: LOCALE;
// }

// const initialState: State = {
//   lang: localStorage.getItem("lang") || "en-uk",
// };

// const localeReducer = createSlice({
//   name: "locale",
//   initialState,
//   reducers: {
//     switchLocale: (state, { payload }: PayloadAction<LOCALE>) => {
//       localStorage.setItem("lang", payload);
//       state.lang = localStorage.getItem("lang") || payload;
//     },
//   },
// });

// export const { switchLocale } = localeReducer.actions;

// export const getLocale = (state: RootState) => state.locale.lang;

// export default localeReducer.reducer;
export {}