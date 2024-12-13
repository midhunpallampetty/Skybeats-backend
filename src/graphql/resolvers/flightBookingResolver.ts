import { bookingModel } from "../../models/bookingData";
import { sendTicketEmail } from "../../services/emailService";
import { BookingInput } from "../interfaces/bookingInput";
import { SeatModel } from "../../models/seats";
import { flightmodel } from "../../models/flights";
import {oneeightyseatModel} from '../../models/oneeightySeats'
import {twoeightyseatModel} from '../../models/twoeightySeats'
import {onetwentyseatModel} from '../../models/onetwentySeats'
import util from 'util-functions-nodejs'
import { transactionModel } from "../../models/transactionModel";
type Passenger = {
  firstName: string;
  lastName: string;
};

interface Input {
  passengerName: Passenger[];
}
type User = {
  age: string;
  disability: string;
  firstName: string;
  lastName: string;
  middleName: string;
  passportNumber: string;
};
const flightBookingResolver = {
  Mutation: {
    createBooking: async (_: {}, args: { input: BookingInput; flightModel: string }) => {
      console.log('createBooking function called');
      console.log(args.input, 'inputgreg');
      console.log(args.flightModel, 'flightModel');
    
      try {
        let seats;
        const trackingId = 'TRB' + util.generateOtp(12)
        const transactionData={
          userId:args.input.userId,
          transactionType:'success',
          transactionId:trackingId,
          status:'success',
          amount:args.input.FarePaid,
        }
        const saveTransaction=new transactionModel(transactionData)
        saveTransaction.save()
        if (args.flightModel.includes('Boeing 737') || args.flightModel.includes('Airbus A320')) {
          console.log(args.flightModel, 'Validating seat with 180-seat configuration');
          seats = await oneeightyseatModel.find({ isBooked: false }); 
        } else if (args.flightModel.includes('Boeing') && !args.flightModel.includes('737')) {
          console.log(args.flightModel, 'Validating seat with 280-seat configuration');
          seats = await twoeightyseatModel.find({ isBooked: false });
        } else if (args.flightModel.includes('Airbus') && !args.flightModel.includes('320')) {
          console.log(args.flightModel, 'Validating seat with 280-seat configuration');
          seats = await twoeightyseatModel.find({ isBooked: false });
        } else {
          console.log(args.flightModel, 'Validating seat with 120-seat configuration');
          seats = await onetwentyseatModel.find({ isBooked: false });
        }
    
        const selectedSeatNumbers = args.input.seatNumber; 
        const bookedSeats = [];
    
        
        if (selectedSeatNumbers && selectedSeatNumbers.length > 0) {
          for (const seatId of selectedSeatNumbers) {
            const seatExists = seats.find(seat => seat._id.toString() === seatId);
    
            if (!seatExists) {
              throw new Error(`Provided seat number ${seatId} does not exist or is already booked.`);
            }
    
            
            await seatExists.save();
    
            bookedSeats.push(seatId); 
          }
        } else {
          
          let number = Math.floor(Math.random() * seats.length);
          while (seats[number].isBooked) {
            number = Math.floor(Math.random() * seats.length);
          }
    
          seats[number].isBooked = true;
          await seats[number].save(); 
    
          bookedSeats.push(seats[number]._id); 
        }
    
        const { input } = args;
        const flightNumber = input.flightNumber;
        const seatsBooked = input.seatNumber;
        
        console.log('Searching for existing flight with flightNumber:', flightNumber);
        const existingFlight = await flightmodel.findOne({ flightNumber });
        console.log(existingFlight,'existing flight')
        if (existingFlight) {
          console.log('Flight found, updating seatsBooked array');
          
          await flightmodel.findOneAndUpdate(
            { flightNumber },
            { $addToSet: { seatsBooked: { $each: seatsBooked } } }, 
            { new: true }
          );
        } else {
          console.log('Flight not found, creating new document');
          
          const newFlightData = {
            flightNumber,
            seatsBooked
          };
          await flightmodel.create(newFlightData);
        }

        const newBookingData = { ...input, seatNumber: bookedSeats };
        const booking = new bookingModel(newBookingData);
        const savedBooking = await booking.save();
    
        
    const mainUser = input.passengerName?.[0];
    console.log(mainUser.toString(),'hai')

        await sendTicketEmail(
          input.email,
          input.passengerName,
          input.flightNumber,
          input.departureAirport,
          input.arrivalAirport,
          input.departureTime,
          input.arrivalTime,
          input.FarePaid,
          input.ticketUrls
        );
    
        return savedBooking;
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error('Error creating booking: ' + error.message);
        } else {
          throw new Error('Error creating booking: An unknown error occurred');
        }
      }
      
    },
    
    

  },
  Query: {
    getAllBooking: async () => {
      try {
        const bookings = await bookingModel.find()
        console.log(bookings)
        return bookings;
      } catch (error) {
        console.log('error fetching booking data')
        throw new Error('Error while getting data from booking service');

      }
    },
    getBookingById: async (_: {}, { userId }: { userId: string }) => {          
      try {
        const bookings = await bookingModel.find({ userId: userId }).sort({createdAt:-1});
    console.log(bookings)
        if (!bookings || bookings.length === 0) {
          throw new Error('No bookings found for this user');
        }
    
        return bookings;
      } catch (error) {
        console.error('Error fetching bookings:', error);
        throw new Error('Error fetching bookings');
      }
    },
    getRandomSeat: async (_: {}, args: { flightModel: string }) => {
      console.log('getRandomSeat function called');
      console.log(args.flightModel, 'flightModel');
    
      try {
        let seats;
    
    
        if (args.flightModel.includes('Boeing 737') || args.flightModel.includes('Airbus A320')) {
          console.log(args.flightModel, 'Fetching from 180-seat configuration');
          seats = await oneeightyseatModel.find({ isBooked: false });
        } else if (args.flightModel.includes('Boeing') && !args.flightModel.includes('737')) {
          console.log(args.flightModel, 'Fetching from 280-seat configuration');
          seats = await twoeightyseatModel.find({ isBooked: false });
        } else if (args.flightModel.includes('Airbus') && !args.flightModel.includes('320')) {
          console.log(args.flightModel, 'Fetching from 280-seat configuration');
          seats = await twoeightyseatModel.find({ isBooked: false });
        } else {
          console.log(args.flightModel, 'Fetching from 120-seat configuration');
          seats = await onetwentyseatModel.find({ isBooked: false });
        }
    
        
        if (!seats || seats.length === 0) {
          throw new Error('No available seats for this flight model.');
        }
    
    
        const randomIndex = Math.floor(Math.random() * seats.length);
        const selectedSeat = seats[randomIndex];
    
        console.log('Random seat found:', selectedSeat);
    
        return {
          seatId: selectedSeat._id,
          row: selectedSeat.row,
          col: selectedSeat.col,
          class: selectedSeat.class,
        };
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error fetching random seat:', error.message);
          throw new Error('Error fetching random seat: ' + error.message);
        } else {
          console.error('Error fetching random seat: An unknown error occurred');
          throw new Error('Error fetching random seat: An unknown error occurred');
        }
      }
      
    },
    
    
    
  },
};




export default flightBookingResolver;