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
        console.log(args.input, 'input');
        console.log(args.flightModel, 'flightModel');
      
        try {
          // Step 1: Fetch flight data to get the booked seats for the flightNumber
          const flight = await flightmodel.findOne({ flightNumber: args.input.flightNumber });
          const alreadyBookedSeats = flight ? flight.seatsBooked : []; // Seats already booked for this flight
          let seats;
  
          // Step 2: Determine seat model based on flightModel and fetch unbooked seats
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
      
          const selectedSeatNumbers = args.input.seatNumber; // Seat numbers provided by the user
          const bookedSeats = [];
  
          // Step 3: If seat numbers are provided, verify if they are already booked
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
            const numberOfSeats = args.input.passengerName.length; // Assuming one seat per passenger
  
            for (let i = 0; i < numberOfSeats; i++) {
              let randomSeatIndex = randomSeat(seats);
  
              // Ensure that randomly selected seat is not booked
              while (seats[randomSeatIndex].isBooked || alreadyBookedSeats.includes(seats[randomSeatIndex]._id.toString())) {
                randomSeatIndex = randomSeat(seats); // Keep trying until an available seat is found
              }
  
              // Mark seat as booked and save the update
              seats[randomSeatIndex].isBooked = true;
              await seats[randomSeatIndex].save();
              bookedSeats.push(seats[randomSeatIndex]._id); // Add seat to the bookedSeats array
            }
          }
      
          // Step 5: Update the flight model with newly booked seats
          const flightData = {
            flightNumber: args.input.flightNumber,
            seatsBooked: [...alreadyBookedSeats, ...bookedSeats] // Append new booked seats to the existing ones
          };
          await flightmodel.updateOne({ flightNumber: args.input.flightNumber }, { $set: { seatsBooked: flightData.seatsBooked } });
  
          // Step 6: Save the new booking details
          const newBookingData = { ...args.input, seatNumber: bookedSeats }; // Add booked seats to booking input
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