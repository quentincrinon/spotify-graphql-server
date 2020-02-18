import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    currentUserAlbums(limit: Int, offset: Int): [Album]
    currentUserTracks(limit: Int, offset: Int, market: String): [Track]
  }

  extend type Mutation {
    addCurrentUserAlbums(ids: String!): String
    addCurrentUserTracks(ids: String!): String
    removeCurrentUserAlbums(ids: String!): String
    removeCurrentUserTracks(ids: String!): String
  }
`;

export default typeDefs;
