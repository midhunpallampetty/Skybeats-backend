"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const hotelBookingTypedefs = (0, apollo_server_express_1.gql) `
  type hotelBooking {
    id: ID!
    guestName: String!
    email: String!
    phoneNumber: String!
    noOfGuests:String!
    checkin:String!
    checkout:String!
    amount:Int!
    hotelName:String!
    hotelLocation:String!
    createdAt:String
    userId:String
    cancelled:Boolean
  }

  input hotelBookingInput {
    guestName: String!
    email: String!
    phoneNumber: String!
    noOfGuests:String!
    checkin:String!
    checkout:String!
    amount:Int!
    hotelName:String!
    hotelLocation:String!
    userId:String
  }

  type Mutation {
    createHotelBooking(input: hotelBookingInput!): hotelBooking!
  }
    type Query{
      getAllHotelBooking(userId:String!):[hotelBooking!]!
      listAllHotels: [hotelBooking!]!
    }
`;
exports.default = hotelBookingTypedefs;
