import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
   uri: 'https://calm-cliffs-00057.herokuapp.com/graphql',
 // uri: 'http://192.168.0.192:5000/graphql',
  cache: new InMemoryCache(),
});
