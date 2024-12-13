"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flightmodel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const FlightSchema = new mongoose_1.default.Schema({
    flightNumber: String,
    seatsBooked: { type: [String] },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 2 * 24 * 60 * 60
    }
});
exports.flightmodel = mongoose_1.default.model('flights', FlightSchema);
