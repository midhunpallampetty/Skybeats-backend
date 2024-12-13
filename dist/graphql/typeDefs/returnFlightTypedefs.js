"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const returnFlightBTypedefs = (0, apollo_server_express_1.gql) `

type Passenger {
    age: String
    disability: String
    firstName: String
    lastName: String
    middleName: String
    passportNumber: String
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
    DateofJourney:String
    flightModel:String
    
    



  }

  type Mutation {
      createReturnBooking(input: BookingInput!, flightModel: String!): Booking!
  }
   
`;
exports.default = returnFlightBTypedefs;
