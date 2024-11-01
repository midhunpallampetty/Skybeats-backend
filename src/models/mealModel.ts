import mongoose from 'mongoose';
const MealSchema=new mongoose.Schema({
    itemName:{type:String},
    hotOrCold:{type:String},
    ImageUrl:{type:String},
    createdAt:{type:Date,default:new Date()},
    stock:{type:Number},
    price:{type:Number}
});

export const mealModel=mongoose.model('meal',MealSchema);
