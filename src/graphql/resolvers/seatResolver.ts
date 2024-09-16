import axios from "axios";
import { Seat } from "../interfaces/Seat";
import { ApiResponse } from "../interfaces/ApiResponse";
import { SeatModel } from "../../models/Seats";
import { flightmodel } from "../../models/flights";
const seatResolvers = {
  Query: {
    getSeats: async (_: {}, { flightNumber }: { flightNumber: String }) => {
      try {
        const flight = await flightmodel.findOne({ flightNumber: flightNumber });
        
        let bookedSeatIds: any[] = [];

        if (flight) {
          bookedSeatIds = flight.seatsBooked || [];
          console.log('Booked seats:', bookedSeatIds);
        } else {
          console.log('Flight not found, returning all seats without any bookings.');
        }

        const allSeats = await SeatModel.find();

        // Step 3: Mark seats as booked if they are in the bookedSeatIds array
        const seatsWithBookingStatus = allSeats.map(seat => {
          const isBooked = bookedSeatIds.some(
            (bookedSeatId: any) => bookedSeatId.toString() === seat._id.toString()
          );
          return {
            ...seat.toObject(),  // Convert seat document to plain object
            isBooked,            // Add isBooked field (default: false if flight not found)
          };
        });

        console.log('Final seats with booking status:', seatsWithBookingStatus);
        return seatsWithBookingStatus;

      } catch (error: any) {
        console.error('Error fetching seats:', error.message);
        throw new Error('Failed to fetch seats');
      }
    }
  },
}
export default seatResolvers;  