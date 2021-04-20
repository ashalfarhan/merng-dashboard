import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ColorModeScript, ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./libs/apollo";
import LocaleProvider from "./libs/i18n";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter forceRefresh>
      <LocaleProvider>
        <ApolloProvider client={client}>
          <ChakraProvider theme={theme}>
            <ColorModeScript />
            <App />
          </ChakraProvider>
        </ApolloProvider>
      </LocaleProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
