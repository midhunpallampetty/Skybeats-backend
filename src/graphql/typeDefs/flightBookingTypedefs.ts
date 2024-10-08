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
    seatNumber:[String]
    ticketUrl:String!
    DateofJourney:String!
    flightModel:String

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
    seatNumber:[String]
    DateofJourney:String!
    flightModel:String
    
    



  }

  type Mutation {
      createBooking(input: BookingInput!, flightModel: String!): Booking!
  }
    type Query{
    getAllBooking:[Booking!]!
    getBookingById(userId:ID!):[Booking!]!
    }
`;

export default flightBookingTypedefs;
