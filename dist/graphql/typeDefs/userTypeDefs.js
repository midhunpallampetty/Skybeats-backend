"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const userTypeDefs = (0, apollo_server_express_1.gql) `
type User {
    id: ID!
    username: String!
    email: String!
    password: String!
   
  }
  type AuthPayload {
  token: String!
  user: User!
}
  input SignupInput {
  username: String!
  email: String!
  password: String!
}
   type Mutation {
    userSignup(input: SignupInput!): AuthPayload!
  }
`;
exports.default = userTypeDefs;
