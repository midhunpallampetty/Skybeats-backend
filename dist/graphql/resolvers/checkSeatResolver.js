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
const checkSeat_1 = require("../../models/checkSeat"); // Import the Mongoose model
const checkSeatsResolver = {
    Query: {
        checkSeat: (_1, _a, context_1, info_1) => __awaiter(void 0, [_1, _a, context_1, info_1], void 0, function* (_, { holdSeatId, aircraftId }, context, info) {
            try {
                const seat = yield checkSeat_1.checkseatModel.findOne({ holdSeatId, aircraftId });
                return !!seat;
            }
            catch (error) {
                console.error(error);
                throw new Error("Failed to check seat availability.");
            }
        }),
    },
    Mutation: {
        holdSeats: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { holdSeatIds, aircraftId, sessionId, userId }) {
            try {
                const heldSeats = [];
                const bulkOperations = [];
                for (const holdSeatId of holdSeatIds) {
                    const existingHold = yield checkSeat_1.checkseatModel.findOne({ holdSeatId, aircraftId });
                    if (existingHold) {
                        throw new Error(`Seat ${holdSeatId} is already held.`);
                    }
                    bulkOperations.push({
                        insertOne: {
                            document: {
                                holdSeatId,
                                aircraftId,
                                sessionId,
                                userId,
                                status: 'held',
                                createdAt: new Date(),
                            },
                        },
                    });
                }
                if (bulkOperations.length > 0) {
                    const result = yield checkSeat_1.checkseatModel.bulkWrite(bulkOperations);
                    const insertedIds = Object.values(result.insertedIds);
                    const insertedDocuments = yield checkSeat_1.checkseatModel.find({ _id: { $in: insertedIds } });
                    heldSeats.push(...insertedDocuments);
                }
                return heldSeats;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to hold the seats.');
            }
        }),
        releaseSeat: (_1, _a, context_1, info_1) => __awaiter(void 0, [_1, _a, context_1, info_1], void 0, function* (_, { holdSeatId, aircraftId }, context, info) {
            var _b;
            const userId = (_b = context.user) === null || _b === void 0 ? void 0 : _b.id;
            if (!userId)
                throw new Error("User not authenticated.");
            try {
                const seat = yield checkSeat_1.checkseatModel.findOneAndDelete({
                    holdSeatId,
                    aircraftId,
                    userId,
                });
                if (!seat) {
                    throw new Error("No held seat found to release.");
                }
                return true;
            }
            catch (error) {
                console.error(error);
                throw new Error("Failed to release the seat.");
            }
        }),
    },
};
exports.default = checkSeatsResolver;
