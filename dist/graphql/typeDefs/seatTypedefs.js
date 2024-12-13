"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const seatTypedefs = (0, apollo_server_express_1.gql) `
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
  getSeats(flightNumber:String!,flightModel:String!): [Seat!]!
}
`;
exports.default = seatTypedefs;
