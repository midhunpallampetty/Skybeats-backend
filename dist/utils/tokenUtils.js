"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = exports.verifyRefreshToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'your-access-token-secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your-refresh-token-secret';
const generateAccessToken = (payload) => {
    console.log("Generating Access Token for Payload:", payload);
    const token = jsonwebtoken_1.default.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    console.log("Generated Access Token:", token);
    return token;
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};
exports.generateRefreshToken = generateRefreshToken;
const verifyRefreshToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, REFRESH_TOKEN_SECRET);
        return decoded;
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            console.error('Refresh token has expired');
        }
        else {
            console.error('Invalid refresh token');
        }
        return null;
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
const verifyAccessToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_SECRET);
        return decoded;
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            console.error('access token has expired');
        }
        else {
            console.error('Invalid access token');
        }
        return null;
    }
};
exports.verifyAccessToken = verifyAccessToken;
