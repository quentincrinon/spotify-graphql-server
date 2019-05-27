import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Track {
    id: String!
    name: String!
    type: String!
    uri: String!
  }
`;

export default typeDefs;
