"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const transactionTypedefs = (0, apollo_server_express_1.gql) `
  type Transaction {
    userId: String
    transactionType: String
    createdAt: String
    transactionId: String
    status: String
    amount: Float
  }

  type Query {
    ListTransactions(userId: String!): [Transaction]
  }
`;
exports.default = transactionTypedefs;
