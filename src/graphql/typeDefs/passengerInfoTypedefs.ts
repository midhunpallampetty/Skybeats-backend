import { gql } from "apollo-server-express";
const passengerinfoTypedefs=gql`
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
export default passengerinfoTypedefs;