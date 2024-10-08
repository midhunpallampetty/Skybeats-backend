import mongoose from 'mongoose';
const twoeightyseatSchema=new mongoose.Schema({
    row:Number,
    col:String,
    x:Number,
    y:Number,
    class:String,
    aircraftID:String,
    isBooked:Boolean,


})
export const twoeightyseatModel=mongoose.model('twoeightySeats',twoeightyseatSchema);