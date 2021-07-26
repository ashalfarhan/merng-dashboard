import React, { PropsWithChildren } from "react";
import { IntlProvider } from "react-intl";
import { resources } from "../lang";
import flatten from "flat";
import { useLocale } from "../context/LocaleContext";

const LocaleProvider = ({ children }: PropsWithChildren<any>) => {
  const { locale } = useLocale();
  return (
    <IntlProvider
      textComponent={React.Fragment}
      locale={locale}
      messages={flatten(resources[locale])}
    >
      {children}
    </IntlProvider>
  );
};
export default LocaleProvider;
