import { bookingModel } from "../../models/bookingData"; 
import { sendTicketEmail } from "../../services/emailService";
import { BookingInput } from "../interfaces/BookingInput";
const flightBookingResolver = {
  Mutation: {
    createBooking: async (_:{}, args:{ input:BookingInput }) => {
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
