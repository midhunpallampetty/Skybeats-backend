"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AdminSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    adminType: { type: String, enum: ['superadmin', 'flightoperator', 'cargomanager', 'hoteladmin', 'cabadmin', 'hradmin'] }
});
exports.AdminModel = mongoose_1.default.model('Admin', AdminSchema);
