import { gql } from "apollo-server-express";

const checkSeatTypedefs = gql`
  type CheckSeat {
    aircraftId: String!
    holdSeatId: [String!]!
    userId: String!
  }

  input CheckSeatInput {
    aircraftId: String!
    holdSeatId: [String!]!
    userId: String!
  }

  type Mutation {
    holdSeat(input: CheckSeatInput!): CheckSeat!
    checkSeat(input: CheckSeatInput!): Boolean!
  }
`;

export default checkSeatTypedefs;
