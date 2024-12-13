"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const profileDetailstypedef = (0, apollo_server_express_1.gql) `
type Profile{
    userId:String
    gender:String
    contactNo:String
    currentAddress:String
    permananentAddress:String
    email:String
    birthday:String
}
input ProfileInput{
 userId:String
    gender:String
    contactNo:String
    currentAddress:String
    permananentAddress:String
    email:String
    birthday:String

}    
type User {
  _id: ID!
  walletBalance: Float
}
type Mutation{
addorUpdateProfile(input:ProfileInput!):Profile!
}
type Query{
getProfileDetails(userId:String!):Profile!
  getWalletDetails(userId: ID!): User
  }


`;
exports.default = profileDetailstypedef;
