import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { PropsWithChildren } from "react";
// import { TokenRefreshLink } from "apollo-link-token-refresh";
// import { isValid } from "../helpers/auth";
const token = localStorage.getItem("fmas");

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      return console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    return;
  }
  console.log(`[Unknown error]: `);
});

// const refreshTokenLink = new TokenRefreshLink({
//   accessTokenField: "accessToken",
//   isTokenValidOrUndefined: () => {
//     // @ts-ignore
//     return isValid(token);
//   },
//   fetchAccessToken: () => {
//     return fetch("/refresh_token", {
//       method: "POST",
//       credentials: "include",
//       mode: "same-origin",
//     });
//   },
//   handleFetch: (accessToken) => {
//     localStorage.setItem("fmas", accessToken);
//   },
//   handleError: (err) => {
//     console.warn("Your refresh token is invalid. Try to relogin");
//     console.error(err);
//   },
// });

const httpLink = createHttpLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  link: ApolloLink.from([httpLink, authLink, errorLink]),
  cache: new InMemoryCache(),
  credentials: "include",
});
export const ApolloGqlProvider = ({ children }: PropsWithChildren<any>) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
