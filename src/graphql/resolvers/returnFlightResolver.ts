import { bookingModel } from "../../models/bookingData";
import { sendTicketEmail } from "../../services/emailService";
import { BookingInput } from "../interfaces/bookingInput";
import { SeatModel } from "../../models/seats";
import { flightmodel } from "../../models/flights";
import {oneeightyseatModel} from '../../models/oneeightySeats'
import {twoeightyseatModel} from '../../models/twoeightySeats'
import {onetwentyseatModel} from '../../models/onetwentySeats'
import { Seat } from "../interfaces/seat";
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
const returnFlightResolver = {
  Mutation: {
    createReturnBooking: async (_: {}, args: { input: BookingInput; flightModel: string }) => {
      console.log('createReturnBooking called with input:', args.input);
      console.log('Flight model:', args.flightModel);
      
      try {
        
        const flight = await flightmodel.findOne({ flightNumber: args.input.flightNumber });
        const alreadyBookedSeats = flight ? flight.seatsBooked : []; 
        let seats;
    
        
        if (args.flightModel.includes('Boeing 737') || args.flightModel.includes('Airbus A320')) {
          seats = await oneeightyseatModel.find({ isBooked: false });
        } else if (args.flightModel.includes('Boeing') && !args.flightModel.includes('737')) {
          seats = await twoeightyseatModel.find({ isBooked: false });
        } else if (args.flightModel.includes('Airbus') && !args.flightModel.includes('320')) {
          seats = await twoeightyseatModel.find({ isBooked: false });
        } else {
          seats = await onetwentyseatModel.find({ isBooked: false });
        }
    
        const selectedSeatNumbers = args.input.seatNumber; 
        const bookedSeats = [];
    
        
        if (selectedSeatNumbers && selectedSeatNumbers.length > 0) {
          for (const seatId of selectedSeatNumbers) {
            const seatExists = seats.find(seat => seat._id.toString() === seatId);
    
            if (!seatExists || alreadyBookedSeats.includes(seatId)) {
              throw new Error(`Seat number ${seatId} is already booked or does not exist.`);
            }
    
            
            seatExists.isBooked = true;
            await seatExists.save();
            bookedSeats.push(seatId); 
          }
        } else {
          
          const numberOfSeats = args.input.passengerName.length; 
    
          for (let i = 0; i < numberOfSeats; i++) {
            let randomSeatIndex = randomSeat(seats);
    
          
            while (seats[randomSeatIndex].isBooked || alreadyBookedSeats.includes(seats[randomSeatIndex]._id.toString())) {
              randomSeatIndex = randomSeat(seats); 
            }
    
            
            seats[randomSeatIndex].isBooked = true;
            await seats[randomSeatIndex].save();
            bookedSeats.push(seats[randomSeatIndex]._id); 
          }
        }
      const flightNumber=args.input.flightNumber ;
      const seatsBooked = args.input.seatNumber;

        
        const existingFlight = await flightmodel.findOne({ flightNumber });
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
    
        
        const newBookingData = { ...args.input, seatNumber: bookedSeats }; 
        const booking = new bookingModel(newBookingData);
        const savedBooking = await booking.save();
    
        
        await sendTicketEmail(
          args.input.email,
          args.input.passengerName,
          args.input.flightNumber,
          args.input.departureAirport,
          args.input.arrivalAirport,
          args.input.departureTime,
          args.input.arrivalTime,
          args.input.FarePaid,
          args.input.ticketUrls
        );
    
        return savedBooking;
      }catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error in createReturnBooking:', error.message);
          throw new Error('Error creating booking: ' + error.message);
        } else {
          console.error('Error in createReturnBooking: An unknown error occurred');
          throw new Error('Error creating booking: An unknown error occurred');
        }
      }
      
    },
                                                              
    
    

  },
 
};
function randomSeat(seats: unknown[]) {
    const randomIndex = Math.floor(Math.random() * seats.length);
    return randomIndex;
  }



export default returnFlightResolver;