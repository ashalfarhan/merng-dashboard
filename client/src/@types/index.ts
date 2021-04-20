import React from "react";
import { LOCALES } from "./enums";

export type LocaleAction =
  | { type: "SET"; payload: LOCALES }
  | { type: "RESET"; payload: LOCALES };

export type AppLocaleCtxType = {
  locale: string | LOCALES;
  dispatch?: React.Dispatch<LocaleAction>;
};
