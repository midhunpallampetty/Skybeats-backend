"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudImageModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cloudImageSchema = new mongoose_1.default.Schema({
    imageUrl: { type: String }
});
exports.cloudImageModel = mongoose_1.default.model('cloudImage', cloudImageSchema);
