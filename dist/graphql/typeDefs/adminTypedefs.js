"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const adminTypedefs = (0, apollo_server_express_1.gql) `
  type Admin {
    id: ID!
    email: String!
    password: String!
    adminType: String!
  }

  input LoginInput {
    email: String!
    password: String!
    adminType: String!
  }

  input SignupInput {
    email: String!
    password: String!
    adminType: String!
  }

  type AuthPayload {
    admin: Admin!
    adminaccessToken: String!
    adminrefreshToken: String!
  }

  type TokenPayload {
    adminaccessToken: String!
    adminrefreshToken: String!
  }

  type isAuthorised {
    message: String!
  }

  type Mutation {
    adminSignup(email: String!, password: String!, adminType: String!): AuthPayload!
    adminLogin(email: String!, password: String!, adminType: String!): AuthPayload!
    adminrefreshToken(adminrefreshToken: String!): AuthPayload! # Returns both new access token and refresh token
  }

  type Query {
    isAuthorised(token: String!): isAuthorised
  }
`;
exports.default = adminTypedefs;
