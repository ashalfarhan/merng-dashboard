import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ColorModeScript, ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
// import { ApolloProvider } from "@apollo/client";
// import { client } from "./libs/apollo";
import { ApolloGqlProvider } from "./libs/apollo";
import LocaleProvider from "./libs/i18n";
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter forceRefresh>
        <ApolloGqlProvider>
          <LocaleProvider>
            <ChakraProvider theme={theme}>
              <ColorModeScript />
              <App />
            </ChakraProvider>
          </LocaleProvider>
        </ApolloGqlProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
