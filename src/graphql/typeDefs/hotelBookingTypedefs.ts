import { gql } from 'apollo-server-express';

const hotelBookingTypedefs = gql`
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
    getAllHotelBooking:[hotelBooking!]!
    }
`;

export default hotelBookingTypedefs;
