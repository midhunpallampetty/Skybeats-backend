"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const cargoTypedef = (0, apollo_server_express_1.gql) `
  type CargoBooking {
    packageName: String!
    senderName: String!
    receiverName: String!
    Weight:Float!
    descriptionOfGoods: String!
    approved:Boolean!
    Date_Received:String!
    trackingId:String!
    rejected:Boolean!
    userId:String!
    height:Float
    width:Float
    StartLocation:String
    Destination:String
  }

  input CargoInput {
    packageName: String!
    senderName: String!
    receiverName: String!
    Weight:String!
    descriptionOfGoods: String!
    userId:String!
    height:Float
    width:Float
    StartLocation:String
    Destination:String


  }

  type Mutation {
    requestCargo(input: CargoInput!): CargoBooking!
    toggleApprovalStatus(trackingId: String!): CargoBooking
  }
    type Query{
    getRequests:[CargoBooking!]
    trackCargo(trackingId:String!):[CargoBooking!]!
    getCargoByUser(userId:String!):[CargoBooking!]! 
    }
`;
exports.default = cargoTypedef;
