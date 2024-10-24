import mongoose from 'mongoose';
const hotelBookingSchema=new mongoose.Schema({
    guestName:String,
    email:String,
    phoneNumber:Number,
    noOfGuests:Number,
    checkin:String,
    checkout:String,
    amount:Number,
    hotelName:String,
    hotelLocation:String,
    createdAt:{type:String,default:new Date()},
    userId:{type:String}

})
export const hotelBookingModel=mongoose.model('HotelBooking',hotelBookingSchema);


