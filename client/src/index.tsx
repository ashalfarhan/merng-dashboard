import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ColorModeScript, ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider, ApolloGqlProvider } from "./libs";
import { Provider } from "react-redux";
import store from "./store";
import { LocaleContextProvider } from "./context/LocaleContext";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter forceRefresh>
        <ApolloGqlProvider>
          <LocaleContextProvider>
            <IntlProvider>
              <ChakraProvider theme={theme}>
                <ColorModeScript />
                <App />
              </ChakraProvider>
            </IntlProvider>
          </LocaleContextProvider>
        </ApolloGqlProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
