import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
// import localeReducer from "./slices/locale";
import errorReducer from "./slices/error";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // locale: localeReducer,
    error: errorReducer,
  },
  devTools: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
