import { gql } from "apollo-server-express";

const cancelBookingTypedef = gql`
  type Passenger {
    age: String
    disability: String
    firstName: String
    lastName: String
    middleName: String
    passportNumber: String
  }

  type BookingDetails {
    userId: ID!
    passengerName: [Passenger!]
    email: String
    phoneNumber: String
    departureAirport: String
    arrivalTime: String
    totalPassengers: Float
    FarePaid: String
    seatNumber: [String]
    ticketUrls: String
    DateofJourney: String
  }

  type Mutation {
    CancelTicketById(BookingId: String!): BookingDetails
  }
`;

export default cancelBookingTypedef;
