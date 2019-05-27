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

  type ExternalIds {
    upc: String
    isrc: String
  }
`;

export default typeDefs;
