import mongoose from "mongoose";
const AdminSchema=new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    adminType:{type:String,enum:['superadmin','flightoperator','cargomanager','hoteladmin','cabadmin','hradmin']}

});
export const AdminModel=mongoose.model('Admin',AdminSchema);