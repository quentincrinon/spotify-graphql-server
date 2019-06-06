import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    categories(
      country: String = "GB"
      locale: String = "en_GB"
      limit: Int
      offset: Int
    ): [Category]
    category(category_id: String!): Category
    featured_playlists(
      country: String = "GB"
      locale: String = "en_GB"
      limit: Int
      offset: Int
    ): FeaturedPlaylists
    new_releases(country: String = "GB", limit: Int, offset: Int): NewReleases
  }

  type Category {
    id: String!
    href: String!
    icons: [Image]
    name: String!
    playlists(
      country: String = "GB"
      limit: Int
      offset: Int
    ): [SimplifiedPlaylist]
  }

  type FeaturedPlaylists {
    message: String!
    playlists: [SimplifiedPlaylist]
  }

  type NewReleases {
    message: String
    albums: [SimplifiedAlbum]
  }
`;

export default typeDefs;
