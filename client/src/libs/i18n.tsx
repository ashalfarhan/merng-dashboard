import React, { createContext, PropsWithChildren } from "react";
import { IntlProvider } from "react-intl";
import { LOCALES } from "../@types/enums";
import { resources } from "../lang";
import flatten from "flat";
import { reducer } from "../helpers/localeReducer";
import { AppLocaleCtxType } from "../@types";

export const initialLocale = {
  locale: localStorage.getItem("lang")
    ? // @ts-ignore
      String(localStorage.getItem("lang"))
    : LOCALES.EN,
};

export const AppLocale = createContext<AppLocaleCtxType>(initialLocale);

const LocaleProvider = ({ children }: PropsWithChildren<any>) => {
  const [state, dispatch] = React.useReducer(reducer, initialLocale);
  return (
    <AppLocale.Provider value={{ ...state, dispatch }}>
      <IntlProvider
        textComponent={React.Fragment}
        locale={state.locale}
        // @ts-ignore
        messages={flatten(resources[state.locale])}
      >
        {children}
      </IntlProvider>
    </AppLocale.Provider>
  );
};
export default LocaleProvider;
