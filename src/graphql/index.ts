import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema';
import resolvers from './resolvers';
import dataSources from './datasource';

export default new ApolloServer({
  cacheControl: true,
  uploads: false,
  engine: false,
  introspection: true,
  playground: true,
  typeDefs,
  resolvers,
  dataSources: () => dataSources,
});