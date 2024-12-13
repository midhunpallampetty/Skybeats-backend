"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = [
    { id: '1', email: 'test@example.com', password: 'password123' }, // Dummy data
];
const refreshTokenResolver = {
// Mutation: {
//   login: async (_: any, { email, password }: { email: string; password: string }) => {
//     const user = users.find((u) => u.email === email && u.password === password);
//     if (!user) {
//       throw new Error('Invalid credentials');
//     }
//     const accessToken = generateAccessToken({ userId: user.id });
//     const refreshToken = generateRefreshToken({ userId: user.id });
//     return { accessToken, refreshToken };
//   },
//   refreshToken: async (_: any, { refreshToken }: { refreshToken: string }) => {
//     const payload = verifyRefreshToken(refreshToken);
//     if (!payload) {
//       throw new Error('Invalid or expired refresh token');
//     }
//     const accessToken = generateAccessToken({ userId: payload.userId });
//     const newRefreshToken = generateRefreshToken({ userId: payload.userId });
//     return { accessToken, refreshToken: newRefreshToken };
//   },
// },
};
exports.default = refreshTokenResolver;
