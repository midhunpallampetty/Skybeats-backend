"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const cancelHotelTypedef = (0, apollo_server_express_1.gql) `
 

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
  }

  type Mutation {
    cancelHotel(BookingId: String!): hotelBooking
  }
`;
exports.default = cancelHotelTypedef;
