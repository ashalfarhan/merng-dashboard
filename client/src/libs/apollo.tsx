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
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { isValid } from "../helpers/auth";

const isDev = process.env.NODE_ENV !== "production";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("fmas");
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
    console.error(`[Network error]: ${networkError.message}`);
  }
  console.error(`[Unknown error]`);
});

const refreshTokenLink = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    const token = localStorage.getItem("fmas");
    return !isValid(token);
  },
  fetchAccessToken: () => {
    return fetch("/refresh_token", {
      method: "POST",
      credentials: "include",
    });
  },
  handleFetch: (accessToken) => {
    localStorage.setItem("fmas", accessToken);
  },
  handleError: (err) => {
    console.warn("Your refresh token is invalid. Try to relogin" + err.message);
  },
});

const httpLink = createHttpLink({
  uri: isDev ? "/graphql" : process.env.REACT_APP_GQL_API,
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, refreshTokenLink, httpLink]),
  cache: new InMemoryCache(),
  credentials: "include",
});
export const ApolloGqlProvider = ({ children }: PropsWithChildren<any>) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
