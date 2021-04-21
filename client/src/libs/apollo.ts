import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
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
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
  console.log(`[Unknown error]: `);
});

const httpLink = createHttpLink({
  uri: "http://localhost:4040/graphql",
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink).concat(errorLink),
  cache: new InMemoryCache(),
  credentials: "include",
});
