import { gql } from 'apollo-server-express';

const flightBookingTypedefs = gql`
  type Booking {
    id: ID!
    passengerName: String!
    email: String!
    phoneNumber: String!
    departureAirport: String!
    arrivalAirport: String!
    stop: String!
    flightNumber: String!
    flightDuration: String!
    departureTime: String!
    arrivalTime: String!
    totalPassengers: Int!
    FarePaid: Float!
    seatNumber:ID
  }

  input BookingInput {
    passengerName: String!
    email: String!
    phoneNumber: String!
    departureAirport: String!
    arrivalAirport: String!
    stop: String!
    flightNumber: String!
    flightDuration: String!
    departureTime: String!
    arrivalTime: String!
    totalPassengers: Int!
    FarePaid: Float!
  }

  type Mutation {
    createBooking(input: BookingInput!): Booking!
  }
    type Query{
    getAllBooking:[Booking!]!
    }
`;

export default flightBookingTypedefs;
