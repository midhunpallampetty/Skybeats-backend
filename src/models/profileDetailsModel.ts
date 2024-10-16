import mongoose from 'mongoose';
const profileDetailsSchema=new mongoose.Schema({
    userId:{type:String},
    gender:{type:String},
    contactNo:{type:String},
    currentAddress:{type:String},
    permananentAddress:{type:String},
    email:{type:String},
    birthday:{type:String}
})
export const profiledetailModel=mongoose.model('profile',profileDetailsSchema)