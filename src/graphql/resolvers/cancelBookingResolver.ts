import { Mutation } from "type-graphql";
import { bookingModel } from "../../models/bookingData";
import { UserModel } from "../../models/userModel";
import { transactionModel } from "../../models/transactionModel";
import util from 'util-functions-nodejs';
const cancelBookingResolver={
    Mutation:{
        CancelTicketById:async(_:{},input:{BookingId:String})=>{
        try{
            console.log(input.BookingId,' dscdscv')
            
         const bookingData=await bookingModel.findOne({_id:input.BookingId})
         console.log(bookingData?.userId,bookingData?.FarePaid)
         const user=await UserModel.updateOne({_id:bookingData?.userId},{$inc:{walletBalance:bookingData?.FarePaid}})
         bookingData!.cancelled=true;
         bookingData?.save()
         console.log(user)
         const trackingId = 'TRB' + util.generateOtp(12)
         const transactionData={
           userId:bookingData?.userId,
           transactionType:'cancel',
           transactionId:trackingId,
           status:'success',
           amount:bookingData?.FarePaid
         }
         const saveTransaction=new transactionModel(transactionData)
         saveTransaction.save()
         return bookingData;

        }catch(error){
            console.log('can not perform deletion operation')
        }
         
        },
        CancelTicketByOne: async (_: {}, input: { BookingId: string; seatNumber: string }) => {
            try {
                
                const booking = await bookingModel.findOne({ _id: input.BookingId });
                if (!booking) throw new Error("Booking not found");
        
                console.log(booking.seatNumber, 'Current seats:', input.seatNumber);
        
                
                const seatExists = booking.seatNumber.includes(input.seatNumber);
                if (!seatExists) throw new Error(`Seat number ${input.seatNumber} not found in booking`);
        
                
                if (!booking.cancelledSeats) booking.cancelledSeats = [];
        
                
                if (booking.cancelledSeats.includes(input.seatNumber)) {
                    throw new Error(`Seat number ${input.seatNumber} has already been canceled.`);
                }
        
            
                booking.cancelledSeats.push(input.seatNumber);
        
                
                await bookingModel.updateOne(
                    { _id: input.BookingId },
                    { $set: { cancelledSeats: booking.cancelledSeats } },
                    { upsert: true }
                );
                const trackingId = 'TRB' + util.generateOtp(12)
                const amount=booking?.FarePaid!;
                const newRefund=amount/booking.seatNumber.length;
                const transactionData={
                  userId:booking?.userId,
                  transactionType:'cancel',
                  transactionId:trackingId,
                  status:'success',
                  amount:newRefund
                }
                const saveTransaction=new transactionModel(transactionData)
             saveTransaction.save()
                console.log(transactionData)
                return booking;
            } catch (error) {
                console.error("Error cancelling seat:", error);
                throw new Error("Could not cancel seat");
            }
        }
        
        
        
    }
}



export default cancelBookingResolver;
