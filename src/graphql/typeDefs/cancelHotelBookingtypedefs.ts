import { gql } from "apollo-server-express";

const cancelHotelTypedef = gql`
 

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

export default cancelHotelTypedef;
