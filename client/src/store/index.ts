import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import locale from "./slices/locale";
import error from "./slices/error";
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  TypedUseSelectorHook,
} from "react-redux";

export const store = configureStore({
  reducer: {
    auth,
    locale,
    error,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
