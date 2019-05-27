import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    track(track_id: String!): Track
    audioFeatures(track_id: String!): AudioFeatures
  }

  type Track {
    id: String!
    name: String!
    artists: [Artist]!
    track_number: Int!
    type: String!
    available_markets: [String]!
    disc_number: Int!
    duration_ms: Int!
    explicit: Boolean!
    external_urls: Url!
    external_ids: ExternalIds
    href: String!
    is_local: Boolean!
    preview_url: String
    uri: String!
    album: Album
  }

  type AudioFeatures {
    danceability: Float
    energy: Float
    key: Int
    loudness: Float
    mode: Int
    speechiness: Float
    acousticness: Float
    instrumentalness: Float
    liveness: Float
    valence: Float
    tempo: Float
    type: String
    id: String
    uri: String
    track_ref: String
    analysis_url: String
    duration_ms: Int
    time_signature: Int
  }
`;

export default typeDefs;
