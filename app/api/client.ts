import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/index.js';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token =
    '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';
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

export const cache = new InMemoryCache({ resultCaching: true });

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
});

export { client };
