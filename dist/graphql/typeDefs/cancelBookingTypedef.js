"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const cancelBookingTypedef = (0, apollo_server_express_1.gql) `
  type Passenger {
    age: String
    disability: String
    firstName: String
    lastName: String
    middleName: String
    passportNumber: String
  }

  type BookingDetails {
    userId: ID!
    passengerName: [Passenger!]
    email: String
    phoneNumber: String
    departureAirport: String
    arrivalTime: String
    totalPassengers: Float
    FarePaid: String
    seatNumber: [String]
    ticketUrls: String
    DateofJourney: String
  }

  type Mutation {
    CancelTicketById(BookingId: String!): BookingDetails
    CancelTicketByOne(BookingId:String!,seatNumber:String!):BookingDetails
  }
`;
exports.default = cancelBookingTypedef;
