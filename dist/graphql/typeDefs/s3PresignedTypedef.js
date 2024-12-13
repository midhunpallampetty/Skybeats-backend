"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
  type Mutation {
    generatePresignedUrl(filename: String!, fileType: String!): String!
  }
`;
exports.default = typeDefs;
