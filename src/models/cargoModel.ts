import mongoose from 'mongoose';

const cargoSchema = new mongoose.Schema({
  packageName: { type: String, required: true },
  senderName: { type: String, required: true },
  receiverName: { type: String, required: true },
  descriptionOfGoods: { type: String, required: true },
  approved:{type:Boolean},
  Date_Received:{type:String},
  Weight:{type:Number},
  trackingId:{type:String},
  rejected:{type:Boolean},
  userId:{type:String},
  height:{type:Number},
  width:{type:String},
  StartLocation:{type:String},
  Destination:{type:String}
});

export const cargoModel = mongoose.model('Cargo', cargoSchema);
