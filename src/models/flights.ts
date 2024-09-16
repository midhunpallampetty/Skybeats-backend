import mongoose, { Mongoose } from 'mongoose';
const FlightSchema=new mongoose.Schema({
    flightNumber:String,
    seatsBooked:{type:[String]},
    createdAt: {
        type: Date,
        default: Date.now, 
        expires: 2 * 24 * 60 * 60 
      }

})
export const flightmodel=mongoose.model('flights',FlightSchema);