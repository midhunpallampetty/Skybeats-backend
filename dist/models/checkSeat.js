"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkseatModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Define the schema for seat holding
const checkSeatSchema = new mongoose_1.default.Schema({
    holdSeatId: {
        type: String,
        required: true,
        unique: false
    },
    aircraftId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    sessionId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['held', 'booked', 'released'],
        default: 'held'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: '5m' } // TTL for automatic expiry
    }
});
// Composite index to enforce unique (holdSeatId, aircraftId) combination
checkSeatSchema.index({ aircraftId: 1, holdSeatId: 1 }, { unique: true });
// Additional non-unique indices for query performance
checkSeatSchema.index({ userId: 1, aircraftId: 1 });
checkSeatSchema.index({ sessionId: 1, aircraftId: 1 });
exports.checkseatModel = mongoose_1.default.model('CheckSeat', checkSeatSchema);
