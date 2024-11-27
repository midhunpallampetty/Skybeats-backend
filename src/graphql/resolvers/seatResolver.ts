import axios from "axios";
import { Seat } from "../interfaces/seat";
import { ApiResponse } from "../interfaces/apiResponse";
import { SeatModel } from "../../models/seats";
import {onetwentyseatModel} from '../../models/onetwentySeats'
import { twoeightyseatModel } from "../../models/twoeightySeats";
import {oneeightyseatModel} from '../../models/oneeightySeats';
import { flightmodel } from "../../models/flights";
const seatResolvers = {
  Query: {
    getSeats: async (_: {}, { flightNumber, flightModel }: { flightNumber: string, flightModel: string }) => {
      try {
        // Step 1: Find the flight details
        const flight = await flightmodel.findOne({ flightNumber });
        console.log(flightNumber, flightModel, 'Fetching flight details');
    
        let bookedSeatIds: string[] = [];
        let allSeats;
    
        if (flight) {
          bookedSeatIds = flight.seatsBooked || [];
        } else {
          console.log('Flight not found, returning all seats without any bookings.');
        }
    
        // Step 2: Determine seat configuration based on flight model
        if (flightModel.includes('Boeing 737') || flightModel.includes('Airbus A320')) {
          console.log(flightModel, 'Setting seat count to 180');
          allSeats = await oneeightyseatModel.find(); // 180-seat configuration
        } else if (flightModel.includes('Boeing') && !flightModel.includes('737')) {
          console.log(flightModel, 'Setting seat count to 280');
          allSeats = await twoeightyseatModel.find(); // 280-seat configuration for other Boeing models
        } else if (flightModel.includes('Airbus') && !flightModel.includes('320')) {
          console.log(flightModel, 'Setting seat count to 280');
          allSeats = await twoeightyseatModel.find(); // 280-seat configuration for other Airbus models
        } else {
          console.log(flightModel, 'Setting seat count to 120');
          allSeats = await onetwentyseatModel.find(); // Default to 120-seat configuration
        }
    
        // Step 3: Mark seats as booked if they are in the bookedSeatIds array
        const seatsWithBookingStatus = allSeats.map(seat => {
          const isBooked = bookedSeatIds.includes(seat._id.toString());
          return {
            ...seat.toObject(), // Convert seat document to plain object
            isBooked,           // Add isBooked field (default: false if flight not found)
          };
        });
    
        // console.log(seatsWithBookingStatus, 'Processed seats with booking status');
        return seatsWithBookingStatus;
    
      } catch (error: any) {
        console.error('Error fetching seats:', error.message);
        throw new Error('Failed to fetch seats');
      }
    }
    
  
    
  },
}
export default seatResolvers;  