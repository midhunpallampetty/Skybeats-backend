import mongoose from 'mongoose';
const cloudImageSchema=new mongoose.Schema({
 imageUrl:{type:String}
});
export const cloudImageModel=mongoose.model('cloudImage',cloudImageSchema)