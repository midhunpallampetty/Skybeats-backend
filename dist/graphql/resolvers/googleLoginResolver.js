"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../../models/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const googleAuth_1 = require("../../models/googleAuth");
const tokenUtils_1 = require("../../utils/tokenUtils");
const googleLoginResolver = {
    Mutation: {
        handleGoogleLogin: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input }) {
            const { email, password, username } = input;
            try {
                let user = yield userModel_1.UserModel.findOne({ email });
                const token = jsonwebtoken_1.default.sign({ userId: email }, process.env.JWT_SECRET, {
                    expiresIn: "1h",
                });
                const accessToken = (0, tokenUtils_1.generateAccessToken)({ userId: email });
                const refreshToken = (0, tokenUtils_1.generateRefreshToken)({ userId: email });
                const authData = { email, token };
                const newAuth = new googleAuth_1.googleAuthModel(authData);
                newAuth.save();
                if (!user) {
                    user = new userModel_1.UserModel({
                        username: username,
                        email: email,
                        password: password,
                        walletBalance: 0,
                        isBlocked: false,
                    });
                    console.log('user', user);
                    yield user.save();
                }
                const dataToReturn = {
                    name: user.username,
                    email: user.email,
                    password: user.password,
                    accessToken,
                    refreshToken,
                    id: user._id
                };
                console.log(dataToReturn, 'data');
                return dataToReturn;
            }
            catch (error) {
                console.error('Error handling Google login:', error);
                throw new Error('Failed to handle Google login');
            }
        }),
    },
};
exports.default = googleLoginResolver;
