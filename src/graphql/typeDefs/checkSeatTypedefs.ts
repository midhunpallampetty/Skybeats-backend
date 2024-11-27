import { gql } from "apollo-server-express";

const checkSeatTypedefs = gql`
type SeatHold {
  id: ID!
  holdSeatId: String!
  aircraftId: String!
  userId: String!
  sessionId: String!
  status: String!
  createdAt: String!
}

type Query {
  # Check if a specific seat is held for a given aircraft
  checkSeat(holdSeatId: String!, aircraftId: String!): Boolean!
}

type Mutation {
  # Hold multiple seats for a given aircraft and session
  holdSeats(holdSeatIds: [String!]!, aircraftId: String!, sessionId: String!, userId: String!): [SeatHold!]!
  # Release a specific seat for a given aircraft
  releaseSeat(holdSeatId: String!, aircraftId: String!): Boolean!
}
`;

export default checkSeatTypedefs;
