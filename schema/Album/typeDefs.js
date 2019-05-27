import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    album(album_id: String!): Album
  }

  type Album {
    id: String!
    name: String!
    album_type: String!
    artists: [Artist]!
    total_tracks: Int!
    tracks: [Track]
    label: String!
    popularity: Int!
    release_date: String!
    release_date_precision: String
    available_markets: [String]
    copyrights: [Copyrights]
    external_ids: ExternalIds
    external_urls: Url
    genres: [String]
    href: String!
    images: [Image]
    type: String!
    uri: String!
  }

  type Copyrights {
    text: String!
    type: String!
  }
`;

export default typeDefs;
