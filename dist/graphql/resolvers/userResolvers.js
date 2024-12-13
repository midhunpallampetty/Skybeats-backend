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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = require("../../models/userModel");
const mongoose_1 = __importDefault(require("mongoose"));
const emailService_1 = require("../../services/emailService");
const util_functions_nodejs_1 = __importDefault(require("util-functions-nodejs"));
const tokenUtils_1 = require("../../utils/tokenUtils");
const temporaryUserModel_1 = require("../../models/temporaryUserModel");
const resolvers = {
    Mutation: {
        userSignup: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { username, email, password }) {
            try {
                const existingUser = yield userModel_1.UserModel.findOne({ email });
                if (existingUser) {
                    throw new Error("User already exists");
                }
                const existingTempUser = yield temporaryUserModel_1.TemporaryUserModel.findOne({ email });
                if (existingTempUser) {
                    throw new Error("OTP already sent. Please verify your email.");
                }
                const otp = util_functions_nodejs_1.default.generateOtp(6);
                const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);
                console.log(otp, "Generated OTP");
                const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                const tempUser = new temporaryUserModel_1.TemporaryUserModel({
                    username,
                    email,
                    password: hashedPassword,
                    otp,
                    otpExpiry,
                });
                yield tempUser.save();
                console.log("Temporary user saved:", tempUser);
                yield (0, emailService_1.sendOtpEmail)(email, otp);
                return { message: "OTP sent to your email. Please verify to complete signup." };
            }
            catch (error) {
                console.log("Error in userSignup:", error);
                throw new Error("Failed to sign up user.");
            }
        }),
        blockUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            try {
                const user = yield userModel_1.UserModel.findById(id);
                if (!user) {
                    throw new Error('User not found');
                }
                user.isBlocked = !user.isBlocked;
                yield user.save();
                return { message: user.isBlocked ? "User blocked successfully" : "User unblocked successfully" };
            }
            catch (error) {
                console.log(error);
                return { message: "An error occurred" };
            }
        }),
        requestPasswordReset: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { email }) {
            try {
                const resetToken = util_functions_nodejs_1.default.xKeyGenerator(10);
                const resetTokenExpiry = new Date(Date.now() + 7200000);
                const user = yield userModel_1.UserModel.findOneAndUpdate({ email }, {
                    resetPasswordToken: resetToken,
                    resetPasswordExpires: resetTokenExpiry
                }, { new: true, upsert: true });
                if (!user) {
                    throw new Error("User not found or unable to update.");
                }
                const resetUrl = `http://localhost:3000/user/resetPassword?token=${resetToken}`;
                yield (0, emailService_1.sendResetEmail)(email, resetUrl);
                return {
                    message: "Password reset email sent. Please check your inbox.",
                };
            }
            catch (error) {
                console.log("Error while sending reset email:", error);
                throw new Error("Failed to send reset email");
            }
        }),
        changePassword: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id, oldpassword, newpassword }) {
            try {
                // Find the user by ID
                const user = yield userModel_1.UserModel.findById(id);
                if (!user) {
                    return {
                        status: 404,
                        message: "User not found",
                    };
                }
                const isPasswordCorrect = yield bcryptjs_1.default.compare(oldpassword, user.password);
                if (!isPasswordCorrect) {
                    return {
                        status: 400,
                        message: "Incorrect old password",
                    };
                }
                const hashedNewPassword = yield bcryptjs_1.default.hash(newpassword, 10);
                user.password = hashedNewPassword;
                yield user.save();
                return {
                    status: 200,
                    message: "Password changed successfully!",
                };
            }
            catch (error) {
                console.log("Error in changing password:", error);
                return {
                    status: 500,
                    message: "Failed to change password",
                };
            }
        }),
        verifyOtp: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { email, otp }) {
            try {
                const tempUser = yield temporaryUserModel_1.TemporaryUserModel.findOne({ email });
                if (!tempUser) {
                    throw new Error("Temporary user not found.");
                }
                if (tempUser.otp !== otp || tempUser.otpExpiry < new Date()) {
                    throw new Error("Invalid or expired OTP.");
                }
                const newUser = new userModel_1.UserModel({
                    username: tempUser.username,
                    email: tempUser.email,
                    password: tempUser.password,
                    isBlocked: false,
                    walletBalance: 0,
                });
                yield newUser.save();
                console.log("Verified user saved to main database:", newUser);
                yield temporaryUserModel_1.TemporaryUserModel.deleteOne({ email });
                const accessToken = (0, tokenUtils_1.generateAccessToken)({ userId: newUser._id.toString() });
                const refreshToken = (0, tokenUtils_1.generateRefreshToken)({ userId: newUser._id.toString() });
                yield userModel_1.UserModel.updateOne({ _id: newUser._id }, { refreshToken });
                console.log('token', refreshToken, accessToken, 'token......................');
                return {
                    user: {
                        id: newUser._id,
                        username: newUser.username,
                        email: newUser.email,
                    },
                    accessToken,
                    refreshToken,
                };
            }
            catch (error) {
                console.log("Error in verifyOtp:", error);
                throw new Error("Failed to verify OTP.");
            }
        }),
        userLogin: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { email, password }) {
            try {
                const user = yield userModel_1.UserModel.findOne({ email });
                if (!user) {
                    throw new Error("User not found");
                }
                const valid = yield bcryptjs_1.default.compare(password, user.password);
                if (!valid) {
                    throw new Error("Incorrect password");
                }
                if (user.isBlocked) {
                    throw new Error("User is blocked. Please contact support.");
                }
                const accessToken = (0, tokenUtils_1.generateAccessToken)({ userId: user._id.toString() });
                const refreshToken = (0, tokenUtils_1.generateRefreshToken)({ userId: user._id.toString() });
                yield userModel_1.UserModel.updateOne({ _id: user._id }, { refreshToken });
                console.log("Generated Tokens: Access Token and Refresh Token", accessToken, refreshToken);
                return {
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        isBlocked: user.isBlocked,
                    },
                    accessToken,
                    refreshToken,
                };
            }
            catch (error) {
                console.log("Error in Login:", error);
                throw new Error("Failed to login");
            }
        }),
        refreshToken: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { refreshToken }) {
            const payload = (0, tokenUtils_1.verifyRefreshToken)(refreshToken);
            console.log('generating new accessToken');
            if (!payload) {
                throw new Error('Invalid or expired refresh token');
            }
            const accessToken = (0, tokenUtils_1.generateAccessToken)({ userId: payload.userId });
            const newRefreshToken = (0, tokenUtils_1.generateRefreshToken)({ userId: payload.userId });
            return { accessToken, refreshToken: newRefreshToken };
        }),
        resetPassword: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { token, newPassword }) {
            try {
                const user = yield userModel_1.UserModel.findOne({
                    resetPasswordToken: token,
                    resetPasswordExpires: { $gt: Date.now() },
                });
                if (!user) {
                    throw new Error("Invalid or expired password reset token");
                }
                const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
                user.password = hashedPassword;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;
                yield user.save();
                return {
                    message: "Password has been reset successfully!",
                };
            }
            catch (error) {
                console.log("Error in Password Reset:", error);
                throw new Error("Failed to reset password");
            }
        }),
    },
    Query: {
        getUserList: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const users = yield userModel_1.UserModel.find();
                return users;
            }
            catch (error) {
                console.log("Error fetching users:", error);
                throw new Error("Failed to fetch users");
            }
        }),
        getUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { email }) {
            try {
                const user = yield userModel_1.UserModel.findOne({ email });
                if (!user) {
                    throw new Error("User not found");
                }
                return user;
            }
            catch (error) {
                console.log("Error fetching user:", error);
                throw new Error("Failed to fetch user");
            }
        }),
        getUserById: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId }) {
            try {
                if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
                    throw new Error("Invalid user ID format");
                }
                const user = yield userModel_1.UserModel.findOne({ _id: userId });
                if (!user) {
                    throw new Error("User not found");
                }
                return user;
            }
            catch (error) {
                console.log("Error fetching user:", error);
                throw new Error("Failed to fetch user");
            }
        }),
    },
};
exports.default = resolvers;
