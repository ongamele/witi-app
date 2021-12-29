import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://dry-forest-00822.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});
