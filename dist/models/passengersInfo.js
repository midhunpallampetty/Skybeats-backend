"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passengerInfoModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const passengerInfoSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    middleName: { type: String },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    passportNumber: { type: String, required: true },
    lastUsed: { type: Date, default: Date.now },
    age: { type: Number },
});
exports.passengerInfoModel = mongoose_1.default.model('passengerinfo', passengerInfoSchema);
