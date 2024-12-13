"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mealModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MealSchema = new mongoose_1.default.Schema({
    itemName: { type: String },
    hotOrCold: { type: String },
    ImageUrl: { type: String },
    createdAt: { type: Date, default: new Date() },
    stock: { type: Number },
    price: { type: Number }
});
exports.mealModel = mongoose_1.default.model('meal', MealSchema);
