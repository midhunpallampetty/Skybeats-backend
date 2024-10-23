import { gql } from "apollo-server-express";

const googleLoginTypedefs = gql`
  type Mutation {
    handleGoogleLogin(input: GoogleLoginInput!): UserType
  }

  input GoogleLoginInput {
    email: String!
    username: String!
    password: String!
    
  }

  type UserType {
    name: String!
    email: String!
    password: String!
    token: String
    id:ID
    
  }
`;

export default googleLoginTypedefs;
