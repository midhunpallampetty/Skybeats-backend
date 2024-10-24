import { gql } from "apollo-server-express";

const transactionTypedefs = gql`
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

export default transactionTypedefs;
