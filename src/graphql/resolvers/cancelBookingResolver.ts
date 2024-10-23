import { Mutation } from "type-graphql";
import { bookingModel } from "../../models/bookingData";
import { UserModel } from "../../models/userModel";
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

         return bookingData;

        }catch(error){
            console.log('can not perform deletion operation')
        }
         
        }
    }
}



export default cancelBookingResolver;
