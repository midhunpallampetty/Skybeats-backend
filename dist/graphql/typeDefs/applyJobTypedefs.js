"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const applyJobTypedefs = (0, apollo_server_express_1.gql) `
  type Apply {
    id: ID!
    name: String!
    email: String!
    phone: String!
    coverLetter: String!
    cv: String!
    createdAt:String
    Date:String!
    userId:String
  }

  input ApplyJobInput {
    name: String!
    email: String!  # Fixed the semicolon here
    phone: String!
    coverLetter: String!
    cv: String!
    userId:String
    jobPost:String
  }

  type Mutation {
    applyJob(input: ApplyJobInput!): Apply!
  }

   type Query {
    getAllApplication: [Apply!]!
    getApplicationsById(userId: String): [Apply!]!
  }
`;
exports.default = applyJobTypedefs;
