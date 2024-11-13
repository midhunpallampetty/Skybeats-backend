import { bookingModel } from "../../models/bookingData";
import { sendTicketEmail } from "../../services/emailService";
import { BookingInput } from "../interfaces/BookingInput";
import { SeatModel } from "../../models/Seats";
import { flightmodel } from "../../models/flights";
import {oneeightyseatModel} from '../../models/oneeightySeats'
import {twoeightyseatModel} from '../../models/twoeightySeats'
import {onetwentyseatModel} from '../../models/onetwentySeats'
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
        // Step 1: Fetch flight data to get the already booked seats for this flight number
        const flight = await flightmodel.findOne({ flightNumber: args.input.flightNumber });
        const alreadyBookedSeats = flight ? flight.seatsBooked : []; // Existing booked seats for this flight
        let seats;
    
        // Step 2: Determine seat model based on flightModel and fetch unbooked seats
        if (args.flightModel.includes('Boeing 737') || args.flightModel.includes('Airbus A320')) {
          seats = await oneeightyseatModel.find({ isBooked: false });
        } else if (args.flightModel.includes('Boeing') && !args.flightModel.includes('737')) {
          seats = await twoeightyseatModel.find({ isBooked: false });
        } else if (args.flightModel.includes('Airbus') && !args.flightModel.includes('320')) {
          seats = await twoeightyseatModel.find({ isBooked: false });
        } else {
          seats = await onetwentyseatModel.find({ isBooked: false });
        }
    
        const selectedSeatNumbers = args.input.seatNumber; // Seats provided by user
        const bookedSeats = [];
    
        // Step 3: If specific seat numbers are provided, verify if they are available
        if (selectedSeatNumbers && selectedSeatNumbers.length > 0) {
          for (const seatId of selectedSeatNumbers) {
            const seatExists = seats.find(seat => seat._id.toString() === seatId);
    
            if (!seatExists || alreadyBookedSeats.includes(seatId)) {
              throw new Error(`Seat number ${seatId} is already booked or does not exist.`);
            }
    
            // Mark seat as booked and save the update
            seatExists.isBooked = true;
            await seatExists.save();
            bookedSeats.push(seatId); // Add to the bookedSeats array
          }
        } else {
          // Step 4: If no seat numbers provided, assign random seats
          const numberOfSeats = args.input.passengerName.length; // One seat per passenger
    
          for (let i = 0; i < numberOfSeats; i++) {
            let randomSeatIndex = randomSeat(seats);
    
            // Ensure that randomly selected seat is not already booked
            while (seats[randomSeatIndex].isBooked || alreadyBookedSeats.includes(seats[randomSeatIndex]._id.toString())) {
              randomSeatIndex = randomSeat(seats); // Keep trying until an available seat is found
            }
    
            // Mark seat as booked and save the update
            seats[randomSeatIndex].isBooked = true;
            await seats[randomSeatIndex].save();
            bookedSeats.push(seats[randomSeatIndex]._id); // Add to the bookedSeats array
          }
        }
      const flightNumber=args.input.flightNumber ;
      const seatsBooked = args.input.seatNumber;

        // Step 5: Update flight model with newly booked seats, ensuring no duplicates
        const existingFlight = await flightmodel.findOne({ flightNumber });
        if (existingFlight) {
          console.log('Flight found, updating seatsBooked array');
          // If the flight exists, push the new seat numbers into the existing seatsBooked array
          await flightmodel.findOneAndUpdate(
            { flightNumber },
            { $addToSet: { seatsBooked: { $each: seatsBooked } } }, // $addToSet to avoid duplicates
            { new: true }
          );
        } else {
          console.log('Flight not found, creating new document');
          // If the flight does not exist, create a new document with flightNumber and seatsBooked
          const newFlightData = {
            flightNumber,
            seatsBooked
          };
          await flightmodel.create(newFlightData);
        }
    
        // Step 6: Save the new booking details
        const newBookingData = { ...args.input, seatNumber: bookedSeats }; // Include booked seats in booking
        const booking = new bookingModel(newBookingData);
        const savedBooking = await booking.save();
    
        // Step 7: Send email confirmation
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
      } catch (error: any) {
        console.error('Error in createReturnBooking:', error.message);
        throw new Error('Error creating booking: ' + error.message);
      }
    },
                                                              
    
    

  },
 
};
function randomSeat(seats: any[]) {
    const randomIndex = Math.floor(Math.random() * seats.length);
    return randomIndex;
  }



export default returnFlightResolver;