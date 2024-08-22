import { bookingModel } from "../../models/bookingData"; 
import { sendTicketEmail } from "../../services/emailService";
 interface BookingInput {
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
  }
const flightBookingResolver = {
  Mutation: {
    createBooking: async (_:any, args:{ input:BookingInput }) => {
      try {
        const { input } = args;
        const booking = new bookingModel(input);
        const savedBooking = await booking.save();
        await sendTicketEmail(input.email);
        return savedBooking;
      } catch (error:any) {
        throw new Error('Error creating booking: ' + error.message);
      }
    },
    
  },
  Query:{
    getAllBooking:async()=>{
      try{
        const bookings=await bookingModel.find()
        return bookings;
      }catch(error){
        console.log('error fetching booking data')
        throw new Error('Error while getting data from booking service');

      }
    }
  },
};

export default flightBookingResolver;
