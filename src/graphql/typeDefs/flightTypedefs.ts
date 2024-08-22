import { gql } from 'apollo-server-micro';

const flightTypeDefs = gql`
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

export default flightTypeDefs;
