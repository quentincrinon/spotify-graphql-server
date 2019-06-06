import { ApolloServer, gql } from 'apollo-server-express';
import connect from 'connect';
import query from 'qs-middleware';
import {
  typeDefs as Shared,
  resolvers as SharedResolvers
} from './schema/Shared';
import { typeDefs as User, resolvers as UserResolvers } from './schema/User';
import {
  typeDefs as Artist,
  resolvers as ArtistResolvers
} from './schema/Artist';
import { typeDefs as Album, resolvers as AlbumResolvers } from './schema/Album';
import { typeDefs as Track, resolvers as TrackResolvers } from './schema/Track';
import {
  typeDefs as Browse,
  resolvers as BrowseResolvers
} from './schema/Browse';
import {
  typeDefs as Playlist,
  resolvers as PlaylistResolvers
} from './schema/Playlist';
import SpotifyAPI from './data-sources/Spotify';
import { mergeDeep } from 'apollo-utilities';

const GRAPHQL_PORT = 3006;

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
  typeDefs: [
    Query,
    Mutation,
    Shared,
    User,
    Artist,
    Album,
    Track,
    Browse,
    Playlist
  ],
  resolvers: mergeDeep(
    SharedResolvers,
    UserResolvers,
    ArtistResolvers,
    AlbumResolvers,
    TrackResolvers,
    BrowseResolvers,
    PlaylistResolvers
  ),
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
