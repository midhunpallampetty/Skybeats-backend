"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.careerModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const careerSchema = new mongoose_1.default.Schema({
    designation: { type: String, required: true },
    description: { type: String, required: true },
    Image: { type: String, required: true },
    usersApplied: { type: [String] },
    salary: { type: Number },
    createdAt: { type: Date, default: new Date() }
});
exports.careerModel = mongoose_1.default.model('Career', careerSchema);
