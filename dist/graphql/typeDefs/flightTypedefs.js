"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_micro_1 = require("apollo-server-micro");
const flightTypeDefs = (0, apollo_server_micro_1.gql) `
  type Flight {
    airline: String
    flightNumber: String
    departureTime: String
    departureAirport: String
    arrivalTime: String
    arrivalAirport: String
    duration: String
    stops: String
    price: Float
  }

  type Query {
    searchFlights(fromAirport: String!, toAirport: String!): [Flight]
  }
`;
exports.default = flightTypeDefs;
