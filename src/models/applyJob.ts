import mongoose from 'mongoose';
const applyJobSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    coverLetter:{type:String,required:true},
    cv:{type:String,required:true},
    Date:{type:String,required:true},
    userId:{type:String},
 
},   {timestamps:true},)
export const applyJobModel=mongoose.model('appliedJob',applyJobSchema)                                                                                  