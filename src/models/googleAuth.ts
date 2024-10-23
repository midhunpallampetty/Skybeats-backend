import mongoose from 'mongoose';
const googleAuthSchema=new mongoose.Schema({
    token:{type:String},
    email:{type:String},
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:60,
    }
})
export const googleAuthModel=mongoose.model('googleauth',googleAuthSchema);
