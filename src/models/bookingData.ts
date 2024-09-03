import mongoose from 'mongoose';
const bookingSchema=new mongoose.Schema({
    passengerName:String,
    email:String,
    phoneNumber:Number,
    departureAirport:String,
    arrivalAirport:String,
    stop:String,
    flightNumber:String,
    flightDuration:String,
    departureTime:String,
    arrivalTime:String,
    totalPassengers:Number,
    FarePaid:Number,
    seatNumber:Object,

})
export const bookingModel=mongoose.model('Booking',bookingSchema);


