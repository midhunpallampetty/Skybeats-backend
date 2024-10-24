import mongoose from 'mongoose';
const transactionSchema=new mongoose.Schema({
userId:{type:String},
transactionType:{type:String},
createdAt:{type:String,default:new Date()},
transactionId:{type:String},
status:{type:String},
amount:{type:Number},
});
export const transactionModel=mongoose.model('transactions',transactionSchema)