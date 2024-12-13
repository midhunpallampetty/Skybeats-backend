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
        
        const flight = await flightmodel.findOne({ flightNumber });
        console.log(flightNumber, flightModel, 'Fetching flight details');
    
        let bookedSeatIds: string[] = [];
        let allSeats;
    
        if (flight) {
          bookedSeatIds = flight.seatsBooked || [];
        } else {
          console.log('Flight not found, returning all seats without any bookings.');
        }
    
        
        if (flightModel.includes('Boeing 737') || flightModel.includes('Airbus A320')) {
          console.log(flightModel, 'Setting seat count to 180');
          allSeats = await oneeightyseatModel.find(); 
        } else if (flightModel.includes('Boeing') && !flightModel.includes('737')) {
          console.log(flightModel, 'Setting seat count to 280');
          allSeats = await twoeightyseatModel.find(); 
        } else if (flightModel.includes('Airbus') && !flightModel.includes('320')) {
          console.log(flightModel, 'Setting seat count to 280');
          allSeats = await twoeightyseatModel.find(); 
        } else {
          console.log(flightModel, 'Setting seat count to 120');
          allSeats = await onetwentyseatModel.find(); 
        }
    
        
        const seatsWithBookingStatus = allSeats.map(seat => {
          const isBooked = bookedSeatIds.includes(seat._id.toString());
          return {
            ...seat.toObject(), 
            isBooked,           
          };
        });
    
        // console.log(seatsWithBookingStatus, 'Processed seats with booking status');
        return seatsWithBookingStatus;
    
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error fetching seats:', error.message);
          throw new Error('Failed to fetch seats');
        } else {
          console.error('Error fetching seats: An unknown error occurred');
          throw new Error('Failed to fetch seats: An unknown error occurred');
        }
      }
      
    }
    
  
    
  },
}
export default seatResolvers;  