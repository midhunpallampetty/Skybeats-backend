import mongoose from 'mongoose';

const passengerSchema = new mongoose.Schema({
    age: String,
    disability: String,
    firstName: String,
    lastName: String,
    middleName: String,
    passportNumber: String
});
const bookingSchema=new mongoose.Schema({
    userId:mongoose.Schema.Types.ObjectId,
    passengerName:[passengerSchema],
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
    seatNumber:[String],
    ticketUrls: { type: [String] },
    cancelled:{type:Boolean},
    DateofJourney:{type:String}
})
export const bookingModel=mongoose.model('Booking',bookingSchema);