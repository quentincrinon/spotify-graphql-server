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
    country: String
    email: String
    product: String
  }
`;

export default typeDefs;
