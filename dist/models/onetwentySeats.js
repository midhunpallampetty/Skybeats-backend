"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onetwentyseatModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const onetwentyseatSchema = new mongoose_1.default.Schema({
    row: Number,
    col: String,
    x: Number,
    y: Number,
    class: String,
    aircraftID: String,
    isBooked: Boolean,
});
exports.onetwentyseatModel = mongoose_1.default.model('onetwentyseats', onetwentyseatSchema);
