import mongoose from 'mongoose';
const hotelBookingSchema=new mongoose.Schema({
    guestName:String,
    email:String,
    phoneNumber:Number,
   

})
export const hotelBookingModel=mongoose.model('HotelBooking',hotelBookingSchema);


