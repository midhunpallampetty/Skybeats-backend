"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporaryUserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TemporaryUserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String, required: true },
    otpExpiry: { type: Date, required: true },
});
exports.TemporaryUserModel = mongoose_1.default.model("TemporaryUser", TemporaryUserSchema);
