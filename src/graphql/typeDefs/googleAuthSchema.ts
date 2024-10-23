import { gql } from "apollo-server-express";
const googleAuthSchema=gql`

# schema.graphql

type GoogleAuth {
  email: String
  token: String
  createdAt: String
}

type Query {
  getTokenByEmail(email: String!): GoogleAuth
}

`
export default googleAuthSchema;