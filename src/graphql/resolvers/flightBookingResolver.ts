import { bookingModel } from "../../models/bookingData";
import { sendTicketEmail } from "../../services/emailService";
import { BookingInput } from "../interfaces/BookingInput";
import { SeatModel } from "../../models/Seats";
import { flightmodel } from "../../models/flights";
import {oneeightyseatModel} from '../../models/oneeightySeats'
import {twoeightyseatModel} from '../../models/twoeightySeats'
import {onetwentyseatModel} from '../../models/onetwentySeats'

import mongoose from "mongoose";
const flightBookingResolver = {
  Mutation: {
    createBooking: async (_: {}, args: { input: BookingInput; flightModel: string }) => {
      console.log(args.input, 'input');
      console.log(args.flightModel, 'input');
    
      try {
        let seats;
        // Determine which seat model to use based on the flight model
        if (args.flightModel.includes('Boeing 737') || args.flightModel.includes('Airbus A320')) {
          console.log(args.flightModel, 'Validating seat with 180-seat configuration');
          seats = await oneeightyseatModel.find(); // 180-seat configuration
        } else if (args.flightModel.includes('Boeing') && !args.flightModel.includes('737')) {
          console.log(args.flightModel, 'Validating seat with 280-seat configuration');
          seats = await twoeightyseatModel.find(); // 280-seat configuration for other Boeing models
        } else if (args.flightModel.includes('Airbus') && !args.flightModel.includes('320')) {
          console.log(args.flightModel, 'Validating seat with 280-seat configuration');
          seats = await twoeightyseatModel.find(); // 280-seat configuration for other Airbus models
        } else {
          console.log(args.flightModel, 'Validating seat with 120-seat configuration');
          seats = await onetwentyseatModel.find(); // Default to 120-seat configuration
        }
    
        const selectedSeatNumbers = args.input.seatNumber; // Array of seat numbers
        const bookedSeats = [];
    
        // Check if each seat exists in the available seats
        if (selectedSeatNumbers && selectedSeatNumbers.length > 0) {
          for (const seatId of selectedSeatNumbers) {
            const seatExists = seats.find(seat => seat._id.toString() === seatId);
    
            if (!seatExists) {
              throw new Error(`Provided seat number ${seatId} does not exist.`);
            }
    
            bookedSeats.push(seatId); // Add existing seat ID to bookedSeats array
          }
        } else {
          // Random seat selection if no seats provided
          let number = 3;
          if (seats[number].isBooked) {
            number = randomSeat(seats);
          }
    
          bookedSeats.push(seats[number]._id); // Add selected random seat
        }
    
        const { input } = args;
        const flightData = {
          flightNumber: input.flightNumber,
          seatsBooked: bookedSeats // Use array of booked seats
        };
    
        const flightDataUpdation = new flightmodel(flightData);
    
        const newBookingData = { ...input, seatNumber: bookedSeats }; // Update to use array
        const booking = new bookingModel(newBookingData);
        const savedBooking = await booking.save();
    
        await flightDataUpdation.save();
    
        await sendTicketEmail(
          input.email,
          input.passengerName,
          input.flightNumber,
          input.departureAirport,
          input.arrivalAirport,
          input.departureTime,
          input.arrivalTime,
          input.FarePaid,
          input.ticketUrl
        );
    
        return savedBooking;
      } catch (error: any) {
        throw new Error('Error creating booking: ' + error.message);
      }
    },
    

  },
  Query: {
    getAllBooking: async () => {
      try {
        const bookings = await bookingModel.find()
        return bookings;
      } catch (error) {
        console.log('error fetching booking data')
        throw new Error('Error while getting data from booking service');

      }
    },
    getBookingById: async (_: {}, { userId }: { userId: string }) => {
      try {
        const bookings = await bookingModel.find({ userId: userId });
    
        if (!bookings || bookings.length === 0) {
          throw new Error('No bookings found for this user');
        }
    
        return bookings;
      } catch (error) {
        console.error('Error fetching bookings:', error);
        throw new Error('Error fetching bookings');
      }
    },
    
    
  },
};
function randomSeat(seat: any) {


  const randomNo = Math.floor(Math.random() * seat.length)
  return randomNo;
}



export default flightBookingResolver;