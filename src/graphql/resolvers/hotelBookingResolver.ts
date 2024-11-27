import { hotelBookingModel } from "../../models/hotelBookingModel"; 
import { sendTicketEmail } from "../../services/emailService";
import { HotelBookingInput } from "../interfaces/hotelBookingInput";
import { transactionModel } from "../../models/transactionModel";
import util from 'util-functions-nodejs'
const hotelBookingResolver = {
  Mutation: {
    createHotelBooking: async (_:{}, args:{ input:HotelBookingInput }) => {
      try {
        const { input } = args;
        console.log(input,'the dadgwefgtaa is here')
        const booking = new hotelBookingModel(input);
        const savedBooking = await booking.save();
        // await sendTicketEmail(input.email,input.guestName);
        const trackingId = 'TRB' + util.generateOtp(12)
        const transactionData={
          userId:input.userId,
          transactionType:'hotel booking',
          transactionId:trackingId,
          status:'success',
          amount:input.amount
        }
        const saveTransaction=new transactionModel(transactionData)
        saveTransaction.save()
        return savedBooking;
      } catch (error:any) {
        throw new Error('Error creating booking: ' + error.message);
      }
    },
    
  },
  Query:{
    getAllHotelBooking: async (_: {}, { userId }: { userId: String }) => {
      try {
        const bookings = await hotelBookingModel.find({ userId }); // Correct usage of find
        return bookings;
      } catch (error) {
        console.log('Error fetching booking data:', error); // Better logging of the actual error
        throw new Error('Error while getting data from booking service');
      }
    }
    
  },
};                                                                                                                    

export default hotelBookingResolver;
