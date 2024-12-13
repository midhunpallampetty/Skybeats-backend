"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyJobModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const applyJobSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    coverLetter: { type: String, required: true },
    cv: { type: String, required: true },
    Date: { type: String, required: true },
    userId: { type: String },
}, { timestamps: true });
exports.applyJobModel = mongoose_1.default.model('appliedJob', applyJobSchema);
