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
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error('Error creating booking: ' + error.message);
        } else {
          throw new Error('Error creating booking: An unknown error occurred');
        }
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
    },
    listAllHotels: async (_: {}, args: {}, { hotelModel }: { hotelModel: any }) => {
      try {
        // Fetch all hotels from the hotelModel
        const hotels = await hotelBookingModel.find();
        return hotels;
      } catch (error) {
        console.error('Error fetching hotel data:', error); // Log the actual error
        throw new Error('Error while fetching hotel data');
      }
    }
    
    
  },
};                                                                                                                    

export default hotelBookingResolver;
