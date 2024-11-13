import mongoose from 'mongoose';
const passengerInfoSchema=new mongoose.Schema({
    userId: { type: String, required: true },
    firstName: { type: String},
    lastName: { type: String},
    middleName: { type: String },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    passportNumber: { type: String, required: true },
    lastUsed: { type: Date, default: Date.now },
    age:{type:Number},
})
export const passengerInfoModel=mongoose.model('passengerinfo',passengerInfoSchema)