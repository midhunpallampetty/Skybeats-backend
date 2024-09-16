import { hotelBookingModel } from "../../models/hotelBookingModel"; 
import { sendTicketEmail } from "../../services/emailService";
import { HotelBookingInput } from "../interfaces/HotelBookingInput";
const hotelBookingResolver = {
  Mutation: {
    createHotelBooking: async (_:{}, args:{ input:HotelBookingInput }) => {
      try {
        const { input } = args;
        console.log(input,'the dadgwefgtaa is here')
        const booking = new hotelBookingModel(input);
        const savedBooking = await booking.save();
        // await sendTicketEmail(input.email,input.guestName);
        return savedBooking;
      } catch (error:any) {
        throw new Error('Error creating booking: ' + error.message);
      }
    },
    
  },
  Query:{
    getAllHotelBooking:async()=>{
      try{
        const bookings=await hotelBookingModel.find()
        return bookings;
      }catch(error){
        console.log('error fetching booking data')
        throw new Error('Error while getting data from booking service');

      }
    }
  },
};

export default hotelBookingResolver;
