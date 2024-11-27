import { gql } from 'apollo-server-express';

const refreshTokenTypedefs = gql`
  type AuthPayload {
    accessToken: String!
    refreshToken: String!
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    refreshToken(refreshToken: String!): AuthPayload!
  }
`;
export default refreshTokenTypedefs;