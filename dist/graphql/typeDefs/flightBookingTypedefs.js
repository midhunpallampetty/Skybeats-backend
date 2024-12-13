"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const flightBookingTypedefs = (0, apollo_server_express_1.gql) `

type Passenger {
    age: String
    disability: String
    firstName: String
    lastName: String
    middleName: String
    passportNumber: String
  }
  type RandomSeat {
  seatId: ID!
  row: String!
  col: String!
  class: String!
}
  type Booking {
    id: ID
    userId:ID
    passengerName: [Passenger]
    email: String
    phoneNumber: String
    departureAirport: String
    arrivalAirport: String
    stop: String
    flightNumber: String
    flightDuration: String
    departureTime: String
    arrivalTime: String
    totalPassengers: Int
    FarePaid: Float
    seatNumber:[String]
    ticketUrls:[String]
    DateofJourney:String
    flightModel:String
    cancelled:Boolean
    cancelledSeats:[String]
    createdAt:String

  }
  input PassengerInput {
    age: String
    disability: String
    firstName: String
    lastName: String
    middleName: String
    passportNumber: String
  }

  input BookingInput {
    userId:ID
    passengerName: [PassengerInput]
    email: String                                                      
    phoneNumber: String
    departureAirport: String
    arrivalAirport: String
    stop: String
    flightNumber: String
    flightDuration: String
    departureTime: String
    arrivalTime: String
    totalPassengers: Int
    FarePaid: Float
    ticketUrls:[String]
    seatNumber:[String]
    DateofJourney:String
    flightModel:String
    
    



  }

  type Mutation {
      createBooking(input: BookingInput!, flightModel: String!): Booking!
  }
    type Query{
    getAllBooking:[Booking!]!
    getBookingById(userId:ID!):[Booking!]!
     getRandomSeat(flightModel: String!): RandomSeat!
    }
`;
exports.default = flightBookingTypedefs;
