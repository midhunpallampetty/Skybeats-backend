import { bookingModel } from "../../models/bookingData";
import { sendTicketEmail } from "../../services/emailService";
import { BookingInput } from "../interfaces/BookingInput";
import { SeatModel } from "../../models/Seats";
import { flightmodel } from "../../models/flights";
import mongoose from "mongoose";
const flightBookingResolver = {
  Mutation: {
    createBooking: async (_: {}, args: { input: BookingInput }) => {
      try {
        const seats = await SeatModel.find();
        let selectedSeatNumber;
    
        if (args.input.seatNumber) {
          const seatExists = seats.find(seat => seat._id.toString() === args.input.seatNumber);
    
          if (!seatExists) {
            throw new Error('Provided seat number does not exist.');
          }
    
          selectedSeatNumber = args.input.seatNumber;
        } else {
          let number = 3; 
          if (seats[number].isBooked) {
            number = randomSeat(seats);
          }
    
          selectedSeatNumber = seats[number]._id;
        }
    
        const { input } = args;
        console.log(input, 'haiaiegbrhefbvg');
        console.log(input.flightNumber, 'test seats');
    
        const flightData = {
          flightNumber: input.flightNumber,
          seatsBooked: selectedSeatNumber
        };
        const flightDataUpdation = new flightmodel(flightData);
    
        const newBookingData = { ...input, seatNumber: selectedSeatNumber};
        const booking = new bookingModel(newBookingData);
        const savedBooking = await booking.save();args
    
        await flightDataUpdation.save();
    
        await sendTicketEmail(input.email,input.passengerName,input.flightNumber,input.departureAirport,input.arrivalAirport,input.departureTime,input.arrivalTime,input.FarePaid,input.ticketUrl);
    
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