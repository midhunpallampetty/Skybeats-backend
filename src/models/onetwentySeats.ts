import mongoose from 'mongoose';
const onetwentyseatSchema=new mongoose.Schema({
    row:Number,
    col:String,
    x:Number,
    y:Number,
    class:String,
    aircraftID:String,
    isBooked:Boolean,


})
export const onetwentyseatModel=mongoose.model('onetwentyseats',onetwentyseatSchema);
