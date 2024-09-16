import mongoose from 'mongoose';
const bookingSchema=new mongoose.Schema({
    userId:mongoose.Schema.Types.ObjectId,
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
    ticketUrl: { type: String },
    cancelled:{type:Boolean}
})
export const bookingModel=mongoose.model('Booking',bookingSchema);


