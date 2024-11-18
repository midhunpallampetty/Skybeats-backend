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

export default applyJobTypedefs;
