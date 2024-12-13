"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profiledetailModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const profileDetailsSchema = new mongoose_1.default.Schema({
    userId: { type: String },
    gender: { type: String },
    contactNo: { type: String },
    currentAddress: { type: String },
    permananentAddress: { type: String },
    email: { type: String },
    birthday: { type: String }
});
exports.profiledetailModel = mongoose_1.default.model('profile', profileDetailsSchema);
