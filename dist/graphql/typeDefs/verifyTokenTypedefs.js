"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const verifyTokenTypedef = (0, apollo_server_express_1.gql) `
 
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
exports.default = verifyTokenTypedef;
