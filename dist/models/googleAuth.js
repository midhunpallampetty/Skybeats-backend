"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuthModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const googleAuthSchema = new mongoose_1.default.Schema({
    token: { type: String },
    email: { type: String },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 60,
    }
});
exports.googleAuthModel = mongoose_1.default.model('googleauth', googleAuthSchema);
