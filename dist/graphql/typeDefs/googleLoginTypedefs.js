"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const googleLoginTypedefs = (0, apollo_server_express_1.gql) `
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
    accessToken: String
    refreshToken: String
    id:ID
    
  }
`;
exports.default = googleLoginTypedefs;
