import { gql } from 'apollo-server-express';

const flightBookingTypedefs = gql`
  type Booking {
    id: ID!
    userId:ID!
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
    ticketUrl:String!
  }

  input BookingInput {
    userId:ID!
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
    ticketUrl:String!
    seatNumber:ID
    



  }

  type Mutation {
    createBooking(input: BookingInput!): Booking!
  }
    type Query{
    getAllBooking:[Booking!]!
    getBookingById(userId:ID!):[Booking!]!
    }
`;

export default flightBookingTypedefs;
