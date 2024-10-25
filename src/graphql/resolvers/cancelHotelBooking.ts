import { hotelBookingModel } from "../../models/hotelBookingModel";
import { UserModel } from "../../models/userModel";
import { transactionModel } from "../../models/transactionModel";
import util from 'util-functions-nodejs';
const cancelHotelResolver={
    Mutation:{
        cancelHotel:async(_:{},input:{BookingId:String})=>{
        try{
            console.log(input.BookingId,' dscdscv')
            
         const bookingData=await hotelBookingModel.findOne({_id:input.BookingId})
         console.log(bookingData?.userId,bookingData?.amount)
         const user=await UserModel.updateOne({_id:bookingData?.userId},{$inc:{walletBalance:bookingData?.amount}})
         bookingData!.cancelled=true;
         bookingData?.save()
         console.log(user)
         const trackingId = 'HTL' + util.generateOtp(12)
         const transactionData={
           userId:bookingData?.userId,
           transactionType:'cancel',
           transactionId:trackingId,                                            
           status:'cancelled',
           amount:bookingData?.amount                               
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



export default cancelHotelResolver;
