import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/index.js';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
    },
  };
});

export const cache = new InMemoryCache({ resultCaching: true });

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
});

export { client };
