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
    graphQLErrors.map(({ message }) => {
      return console.error(`[GraphQL error]: ${message}`);
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError.message}`);
  }
});

const backend = isDev
  ? "http://localhost:4040/refresh_token"
  : process.env.REACT_APP_GQL_API + "/graphql";

const refreshTokenLink = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    const token = localStorage.getItem("fmas");
    return !isValid(token);
  },
  fetchAccessToken: () => {
    return fetch(backend, {
      method: "POST",
      credentials: "include",
      mode: "cors",
    });
  },
  handleFetch: (accessToken) => {
    localStorage.setItem("fmas", accessToken);
  },
  handleError: (err) => {
    console.warn("Your refresh token is invalid. Try to relogin" + err.message);
  },
});

const gqlApi = isDev
  ? "http://localhost:4040/graphql"
  : process.env.REACT_APP_GQL_API + "/graphql";

const httpLink = createHttpLink({
  uri: gqlApi,
  credentials: "include",
  // test
  fetchOptions: {
    mode: "cors",
  },
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, refreshTokenLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export const ApolloGqlProvider = ({ children }: PropsWithChildren<any>) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
