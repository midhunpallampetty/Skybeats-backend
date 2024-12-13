"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const passengerinfoTypedefs = (0, apollo_server_express_1.gql) `
type passengerInfo{
 _id: ID!
  userId: String!
  firstName: String!
  lastName: String
  middleName: String!
  email: String!
  phone: String!
  passportNumber: String!
  lastUsed: String
  age:Float

}
  input savePassengerInfo{
   userId: String!
  firstName: String!
  lastName: String
  middleName: String!
  email: String!
  phone: String!
  passportNumber: String!
  age:Float
  }
  type Query{
  
  getPassengerInfo(userId:String!):[passengerInfo]
  }
  type Mutation{
  savePassengerInfo(input:savePassengerInfo!):passengerInfo
  }


`;
exports.default = passengerinfoTypedefs;
