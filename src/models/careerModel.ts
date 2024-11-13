import mongoose from "mongoose";
const careerSchema=new mongoose.Schema({
    designation:{type:String,required:true},
    description:{type:String,required:true},
    Image:{type:String,required:true},
    usersApplied:{type:[String]},
    salary:{type:Number},
    createdAt:{type:Date,default:new Date()}

})
export const careerModel=mongoose.model('Career',careerSchema);
