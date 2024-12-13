"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const transactionSchema = new mongoose_1.default.Schema({
    userId: { type: String },
    transactionType: { type: String },
    createdAt: { type: String, default: new Date() },
    transactionId: { type: String },
    status: { type: String },
    amount: { type: Number },
});
exports.transactionModel = mongoose_1.default.model('transactions', transactionSchema);
