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

export default hotelBookingTypedefs;
