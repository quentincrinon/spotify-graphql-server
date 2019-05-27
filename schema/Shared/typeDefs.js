import { gql } from 'apollo-server-express';

const typeDefs = gql`
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
