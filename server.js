import { ApolloServer, gql } from 'apollo-server-express';
import connect from 'connect';
import query from 'qs-middleware';
import User from './schema/User/typeDefs';
import resolvers from './schema/User/resolvers';
import SpotifyAPI from './data-sources/Spotify';

const GRAPHQL_PORT = 3001;

// Just to define Query and Mutation type but other query / mutation non-related with any schema can be here
const Query = gql`
  type Query {
    _empty: String
  }
`;

const Mutation = gql`
  type Mutation {
    _empty: String
  }
`;

const server = new ApolloServer({
  typeDefs: [Query, Mutation, User],
  resolvers,
  dataSources: () => ({
    spotifyAPI: new SpotifyAPI()
  })
});

const app = connect();
const path = '/graphql';

app.use(query());
server.applyMiddleware({ app, path });

app.listen(GRAPHQL_PORT, () =>
  console.log(
    `🚀 Server ready at http://localhost:${GRAPHQL_PORT}${server.graphqlPath}`
  )
);
