import { hotelBookingModel } from "../../models/hotelBookingModel"; 
import { sendTicketEmail } from "../../services/emailService";
 interface HotelBookingInput {
    guestName: string;
    email: string;
    phoneNumber: string;
    
  }
const hotelBookingResolver = {
  Mutation: {
    createHotelBooking: async (_:any, args:{ input:HotelBookingInput }) => {
      try {
        const { input } = args;
        console.log(input,'the dadgwefgtaa is here')
        const booking = new hotelBookingModel(input);
        const savedBooking = await booking.save();
        await sendTicketEmail(input.email);
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
