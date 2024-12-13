"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const tokenUtils_1 = require("../../utils/tokenUtils");
const validateTokenResolver = {
    Query: {
        validateToken: (_, args) => {
            console.log(args);
            const { token } = args;
            if (!token) {
                throw new apollo_server_1.AuthenticationError('Token missing');
            }
            const payload = (0, tokenUtils_1.verifyAccessToken)(token);
            if (!payload) {
                throw new apollo_server_1.AuthenticationError('Invalid or expired token');
            }
            return { success: true, user: payload };
        },
    },
};
exports.default = validateTokenResolver;
