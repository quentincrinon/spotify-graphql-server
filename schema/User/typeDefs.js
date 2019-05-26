import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    user(user_id: String!): User
  }

  type User {
    id: String!
    display_name: String!
    type: String!
    uri: String!
    images: [Image]
  }

  type Image {
    height: Int
    url: String!
    width: Int
  }
`;

export default typeDefs;
