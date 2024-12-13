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
Object.defineProperty(exports, "__esModule", { value: true });
// resolvers.js
const googleAuth_1 = require("../../models/googleAuth"); // Import your model
const getGoogleResolver = {
    Query: {
        getTokenByEmail(_1, _a) {
            return __awaiter(this, arguments, void 0, function* (_, { email }) {
                try {
                    const googleAuth = yield googleAuth_1.googleAuthModel.findOne({ email });
                    if (!googleAuth) {
                        throw new Error('Email not found or token expired');
                    }
                    return googleAuth;
                }
                catch (error) {
                    console.error(error);
                    throw new Error('Failed to fetch token');
                }
            });
        },
    },
};
exports.default = getGoogleResolver;
