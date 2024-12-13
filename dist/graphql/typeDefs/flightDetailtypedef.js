"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flightDetailsTypeDef = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.flightDetailsTypeDef = (0, apollo_server_express_1.gql) `
  type Query {
    # Fetches the aircraft model details for a given flight number and airline
    getAircraftModel(flightNumber: String!, airline: String!): AircraftModelResponse
  }

  # Aircraft Model Response Object
  type AircraftModelResponse {
    aircraftDetails: [String]
  }
`;
exports.default = exports.flightDetailsTypeDef;
