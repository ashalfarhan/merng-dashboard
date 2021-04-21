import React, { PropsWithChildren } from "react";
import { IntlProvider } from "react-intl";
import { resources } from "../lang";
import flatten from "flat";
import { useSelector } from "../store";
import { getLocale } from "../store/slices/locale";

const LocaleProvider = ({ children }: PropsWithChildren<any>) => {
  const currentLocale = useSelector(getLocale);
  return (
    <IntlProvider
      textComponent={React.Fragment}
      locale={currentLocale}
      // @ts-ignore
      messages={flatten(resources[currentLocale])}
    >
      {children}
    </IntlProvider>
  );
};
export default LocaleProvider;
