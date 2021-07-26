import { ReactNode, useState, useCallback } from "react";
import { LOCALE } from "../../@types";
import { LocaleContext } from ".";

interface LocaleContextProviderProps {
  children: ReactNode;
}

export const LocaleContextProvider = ({
  children,
}: LocaleContextProviderProps) => {
  const [locale, setLocale] = useState(
    () => localStorage.getItem("locale") ?? "en-uk",
  );
  const switchLocale = useCallback((target: LOCALE) => {
    setLocale(target);
  }, []);
  return (
    <LocaleContext.Provider value={{ locale, switchLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};
