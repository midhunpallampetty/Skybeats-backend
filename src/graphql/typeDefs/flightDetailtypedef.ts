import { gql } from 'apollo-server-express';

export const flightDetailsTypeDef = gql`
  type Query {
    # Fetches the aircraft model details for a given flight number and airline
    getAircraftModel(flightNumber: String!, airline: String!): AircraftModelResponse
  }

  # Aircraft Model Response Object
  type AircraftModelResponse {
    aircraftDetails: [String]
  }
`;

export default flightDetailsTypeDef;
