"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const googleAuthSchema = (0, apollo_server_express_1.gql) `

# schema.graphql

type GoogleAuth {
  email: String
  token: String
  createdAt: String
}

type Query {
  getTokenByEmail(email: String!): GoogleAuth
}

`;
exports.default = googleAuthSchema;
