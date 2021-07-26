import { createContext, useContext } from "react";
import { LOCALE } from "../../@types";

interface LocaleContextValues {
  locale: LOCALE;
  switchLocale: (target: LOCALE) => void;
}

export const LocaleContext = createContext<LocaleContextValues>({
  switchLocale: () => {},
  locale: "en-uk",
});

export const useLocale = () => {
  const locale = useContext(LocaleContext);
  return { ...locale };
};

export * from "./Provider";
