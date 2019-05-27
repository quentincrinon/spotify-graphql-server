import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    me: User
    user(user_id: String!): User
  }

  type User {
    id: String!
    display_name: String!
    type: String!
    uri: String!
    images: [Image]
    href: String
    followers: Followers
    external_urls: Url
    birthdate: String
    counrty: String
    email: String
    product: String
  }

  type Image {
    height: Int
    url: String!
    width: Int
  }

  type Followers {
    href: String
    total: Int
  }

  type Url {
    spotify: String
  }
`;

export default typeDefs;
