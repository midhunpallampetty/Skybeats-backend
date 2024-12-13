"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const refreshTokenTypedefs = (0, apollo_server_express_1.gql) `
  type AuthPayload {
    accessToken: String!
    refreshToken: String!
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    refreshToken(refreshToken: String!): AuthPayload!
  }
`;
exports.default = refreshTokenTypedefs;
