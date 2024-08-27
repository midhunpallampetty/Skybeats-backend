import { gql } from 'apollo-server-express';

const hotelBookingTypedefs = gql`
  type hotelBooking {
    id: ID!
    guestName: String!
    email: String!
    phoneNumber: String!
    
    
  }

  input hotelBookingInput {
    guestName: String!
    email: String!
    phoneNumber: String!
    
  }

  type Mutation {
    createHotelBooking(input: hotelBookingInput!): hotelBooking!
  }
    type Query{
    getAllHotelBooking:[hotelBooking!]!
    }
`;

export default hotelBookingTypedefs;
