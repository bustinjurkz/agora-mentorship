import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});

const prod = process.env.NODE_ENV === 'production';
export const serverClient = new ApolloClient({
  uri: `http://localhost:${prod ? '80' : '3000'}/api/graphql`,
  cache: new InMemoryCache(),
});
