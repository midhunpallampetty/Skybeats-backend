import { gql } from "apollo-server-express";

const applyJobTypedefs = gql`
  type Apply {
    id: ID!
    name: String!
    email: String!
    phone: String!
    coverLetter: String!
    cv: String!
    createdAt:String
    Date:String!
  }

  input ApplyJobInput {
    name: String!
    email: String!  # Fixed the semicolon here
    phone: String!
    coverLetter: String!
    cv: String!
  }

  type Mutation {
    applyJob(input: ApplyJobInput!): Apply!
  }

  type Query {
    getAllApplication: [Apply!]!
  }
`;

export default applyJobTypedefs;
