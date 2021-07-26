import { Fragment, PropsWithChildren } from "react";
import { IntlProvider } from "react-intl";
import { resources } from "../lang";
import flatten from "flat";
import { LocaleContextProvider, useLocale } from "../context/LocaleContext";

const LocaleProvider = ({ children }: PropsWithChildren<any>) => {
  const { locale } = useLocale();
  return (
    <IntlProvider
      textComponent={Fragment}
      locale={locale}
      messages={flatten(resources[locale])}
    >
      <LocaleContextProvider>{children}</LocaleContextProvider>
    </IntlProvider>
  );
};
export default LocaleProvider;
