import mongoose from "mongoose";

const TemporaryUserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String, required: true },
  otpExpiry: { type: Date, required: true },
});

export const TemporaryUserModel = mongoose.model("TemporaryUser", TemporaryUserSchema);
