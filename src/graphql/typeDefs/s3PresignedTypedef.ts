import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Mutation {
    generatePresignedUrl(filename: String!, fileType: String!): String!
  }
`;

export default typeDefs;
