import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/index.js';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = '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';
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const cache = new InMemoryCache({ resultCaching: true });

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
});

export { client };
