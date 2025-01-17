import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/index.js';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token =
    '@git@hub@_pat@_11AEQF4PI0TFS9QXc6Ljmi_8oCMBR@cJwEnsv8vU2tDItv177SNv5GSPdldpqMI0rHzHOWPAB3YkMOGIeFy'.replaceAll(
      '@',
      ''
    );
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
