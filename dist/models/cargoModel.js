"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cargoModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cargoSchema = new mongoose_1.default.Schema({
    packageName: { type: String, required: true },
    senderName: { type: String, required: true },
    receiverName: { type: String, required: true },
    descriptionOfGoods: { type: String, required: true },
    approved: { type: Boolean },
    Date_Received: { type: String },
    Weight: { type: Number },
    trackingId: { type: String },
    rejected: { type: Boolean },
    userId: { type: String },
    height: { type: Number },
    width: { type: String },
    StartLocation: { type: String },
    Destination: { type: String }
});
exports.cargoModel = mongoose_1.default.model('Cargo', cargoSchema);
