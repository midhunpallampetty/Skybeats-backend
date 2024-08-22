import { gql } from "apollo-server-express"
const seatTypedefs=gql`
type Seat {
  row: Int!
  col: String!
  x: Int!
  y: Int!
  class: String!
  aircraftID: String!
  isBooked: Boolean!
}

type Query {
  getSeats: [Seat!]!
}
`;
export default seatTypedefs;