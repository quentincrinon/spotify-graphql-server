import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    artist(artist_id: String!): Artist
  }

  type Artist {
    id: String!
    name: String!
    type: String!
    uri: String!
    images: [Image]
    href: String
    followers: Followers
    external_urls: Url
    popularity: Int
    genres: [String]
    albums: Albums
    related_artists: [Artist]
    top_tracks(country: String = "GB"): [Track]
  }

  type Albums {
    href: String!
    items: [Album]
  }
`;

export default typeDefs;
