import { createContext, useContext } from "react";
import { useIntl } from "react-intl";
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
  const { formatMessage } = useIntl();
  return { ...locale, t: formatMessage };
};

export * from './Provider'
