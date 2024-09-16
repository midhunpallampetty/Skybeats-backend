import { gql } from "apollo-server-express"
const seatTypedefs=gql`
type Seat {
  _id:ID!
  row: Int!
  col: String!
  x: Int!
  y: Int!
  class: String!
  aircraftID: String!
  isBooked: Boolean!
}

type Query {
  getSeats(flightNumber:String!): [Seat!]!
}
`;
export default seatTypedefs;