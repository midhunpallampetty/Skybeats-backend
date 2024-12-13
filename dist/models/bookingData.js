"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const passengerSchema = new mongoose_1.default.Schema({
    age: String,
    disability: String,
    firstName: String,
    lastName: String,
    middleName: String,
    passportNumber: String
});
const bookingSchema = new mongoose_1.default.Schema({
    userId: mongoose_1.default.Schema.Types.ObjectId,
    passengerName: [passengerSchema],
    email: String,
    phoneNumber: Number,
    departureAirport: String,
    arrivalAirport: String,
    stop: String,
    flightNumber: String,
    flightDuration: String,
    departureTime: String,
    arrivalTime: String,
    totalPassengers: Number,
    FarePaid: Number,
    seatNumber: [String],
    ticketUrls: { type: [String] },
    cancelled: { type: Boolean, default: false },
    DateofJourney: { type: String },
    cancelledSeats: { type: [String] },
    createdAt: { type: Date, default: Date.now() }
});
exports.bookingModel = mongoose_1.default.model('Booking', bookingSchema);
