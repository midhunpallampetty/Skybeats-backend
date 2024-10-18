import { gql } from 'apollo-server-express';

const returnFlightBTypedefs = gql`

type Passenger {
    age: String
    disability: String
    firstName: String
    lastName: String
    middleName: String
    passportNumber: String
  }
  type Booking {
    id: ID
    userId:ID
    passengerName: [Passenger]
    email: String
    phoneNumber: String
    departureAirport: String
    arrivalAirport: String
    stop: String
    flightNumber: String
    flightDuration: String
    departureTime: String
    arrivalTime: String
    totalPassengers: Int
    FarePaid: Float
    seatNumber:[String]
    ticketUrls:[String]
    DateofJourney:String
    flightModel:String

  }
  input PassengerInput {
    age: String
    disability: String
    firstName: String
    lastName: String
    middleName: String
    passportNumber: String
  }

  input BookingInput {
    userId:ID
    passengerName: [PassengerInput]
    email: String                                                      
    phoneNumber: String
    departureAirport: String
    arrivalAirport: String
    stop: String
    flightNumber: String
    flightDuration: String
    departureTime: String
    arrivalTime: String
    totalPassengers: Int
    FarePaid: Float
    ticketUrls:[String]
    DateofJourney:String
    flightModel:String
    
    



  }

  type Mutation {
      createReturnBooking(input: BookingInput!, flightModel: String!): Booking!
  }
   
`;

export default returnFlightBTypedefs;