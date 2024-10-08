import mongoose from 'mongoose';
const oneeightyseatSchema=new mongoose.Schema({
    row:Number,
    col:String,
    x:Number,
    y:Number,
    class:String,
    aircraftID:String,
    isBooked:Boolean,


})
export const oneeightyseatModel=mongoose.model('oneeightySeats',oneeightyseatSchema);