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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminModel_1 = require("../../models/adminModel");
function generateAccessToken(adminId, adminType) {
    console.log(adminType, 'adminType');
    const payload = {
        id: adminId,
        role: adminType,
    };
    return jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}
const generateRefreshToken = (adminId) => {
    return jsonwebtoken_1.default.sign({ adminId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};
function verifyRefreshToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET);
        return {
            adminId: decoded.adminId,
        };
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Refresh token verification failed:", error.message);
        }
        else {
            console.error("An unknown error occurred during refresh token verification");
        }
        return null;
    }
}
const adminResolver = {
    Mutation: {
        adminLogin: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { email, password, adminType }) {
            try {
                const admin = yield adminModel_1.AdminModel.findOne({ email });
                if (!admin) {
                    throw new Error("Unable to find admin");
                }
                const isPasswordValid = yield bcryptjs_1.default.compare(password, admin.password);
                if (!isPasswordValid) {
                    throw new Error("Incorrect password");
                }
                if (admin.adminType !== adminType) {
                    throw new Error("Admin type does not match");
                }
                const adminaccessToken = generateAccessToken(admin._id, admin.adminType);
                const adminrefreshToken = generateRefreshToken(admin._id);
                return {
                    admin: {
                        id: admin._id,
                        email: admin.email,
                        adminType: admin.adminType,
                    },
                    adminaccessToken,
                    adminrefreshToken,
                };
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log("Failed to login as admin", error.message);
                }
                else {
                    console.log("An unknown error occurred during admin login");
                }
                throw new Error("Login failed on admin side");
            }
        }),
        adminrefreshToken: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { adminrefreshToken }) {
            try {
                const decoded = verifyRefreshToken(adminrefreshToken);
                if (!decoded) {
                    throw new Error("Invalid or expired refresh token");
                }
                const { adminId } = decoded;
                const admin = yield adminModel_1.AdminModel.findById(adminId);
                if (!admin) {
                    throw new Error("Admin not found");
                }
                const newAccessToken = generateAccessToken(admin._id.toString(), admin.adminType + '');
                return {
                    adminaccessToken: newAccessToken,
                };
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error("Failed to generate new access token:", error.message);
                }
                else {
                    console.error("An unknown error occurred during token generation");
                }
                throw new Error("Token refresh failed");
            }
        }),
        adminSignup: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { email, password, adminType }) {
            try {
                const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                const newUser = new adminModel_1.AdminModel({
                    email,
                    adminType,
                    password: hashedPassword,
                });
                newUser.save();
                console.log('New user saved');
                return {
                    admin: {
                        email,
                        password,
                        adminType
                    }
                };
            }
            catch (error) {
                console.log('Cant save user password');
            }
        })
    },
    Query: {
        isAuthorised: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                console.log(payload);
                const verifyToken = jsonwebtoken_1.default.verify(payload.token, process.env.ACCESS_TOKEN_SECRET);
                console.log(verifyToken);
                const { role } = verifyToken;
                console.log("Received Unique Name:", role);
                return {
                    message: role,
                };
            }
            catch (error) {
                console.log('an error occured');
            }
        }),
    }
};
exports.default = adminResolver;
