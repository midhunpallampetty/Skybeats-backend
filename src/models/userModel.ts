import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    otp: { type: String },
    otpExpiry: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    isBlocked:{type:Boolean},
    walletBalance:{type:Number}

})


export const UserModel = mongoose.model('User', UserSchema);
