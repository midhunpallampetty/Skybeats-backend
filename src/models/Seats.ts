import mongoose from 'mongoose';
const SeatSchema=new mongoose.Schema({
    row:Number,
    col:String,
    x:Number,
    y:Number,
    class:String,
    aircraftID:String,
    isBooked:Boolean,


})
export const SeatModel=mongoose.model('Seat',SeatSchema);