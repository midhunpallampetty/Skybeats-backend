import { gql } from "apollo-server-express";
const verifyTokenTypedef=gql`
 
type User {
  userId: String!
}

type ValidateTokenResponse {
  success: Boolean!
  user: User!
}

type Query {
  validateToken(token: String): ValidateTokenResponse!
  }


`;
export default verifyTokenTypedef;