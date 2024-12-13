"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelBookingModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const hotelBookingSchema = new mongoose_1.default.Schema({
    guestName: String,
    email: String,
    phoneNumber: Number,
    noOfGuests: Number,
    checkin: String,
    checkout: String,
    amount: Number,
    hotelName: String,
    hotelLocation: String,
    createdAt: { type: String, default: new Date() },
    userId: { type: String },
    cancelled: { type: Boolean, default: false }
});
exports.hotelBookingModel = mongoose_1.default.model('HotelBooking', hotelBookingSchema);
