import { ObjectId } from 'mongoose';
export interface BookingInput {
    passengerName: string;
    email: string;
    phoneNumber: string;
    departureAirport: string;
    arrivalAirport: string;
    stop: string;
    flightNumber: string;
    flightDuration: string;
    departureTime: string;
    arrivalTime: string;
    totalPassengers: number;
    FarePaid: number;
    ticketUrls:[string];
    seatNumber:string;
    flightModel:string;
    returnDate:string;
    userId:ObjectId;
    DateofJourney:string;                                                               
  }               