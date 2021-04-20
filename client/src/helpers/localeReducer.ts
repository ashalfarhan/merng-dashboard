import React from "react";
import { LocaleAction } from "../@types";
import { initialLocale } from "../libs/i18n";
export const reducer: React.Reducer<typeof initialLocale, LocaleAction> = (
  state: typeof initialLocale,
  action: LocaleAction
) => {
  switch (action.type) {
    case "RESET":
      return { ...state, ...initialLocale };
    case "SET":
      localStorage.setItem("lang", action.payload);
      return {
        ...state,
        locale: action.payload,
      };
  }
};
