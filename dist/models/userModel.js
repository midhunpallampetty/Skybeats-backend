"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    isBlocked: { type: Boolean },
    walletBalance: { type: Number }
});
exports.UserModel = mongoose_1.default.model('User', UserSchema);
