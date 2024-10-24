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
         
        }
    }
}



export default cancelBookingResolver;
