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
const passengersInfo_1 = require("../../models/passengersInfo");
const passengerInfoResolver = {
    Mutation: {
        savePassengerInfo: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input }) {
            const { userId, firstName, lastName, middleName, email, phone, passportNumber, age } = input;
            console.log(input, 'ghvhgfvghvfgh');
            const updatedDetails = Object.assign(Object.assign({}, input), { lastUsed: new Date().toISOString() });
            const saveInfo = yield passengersInfo_1.passengerInfoModel.findOneAndUpdate({ userId, firstName }, updatedDetails, { new: true, upsert: true });
            return saveInfo;
        })
    },
    Query: {
        getPassengerInfo: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId }) {
            try {
                const passengerInfo = yield passengersInfo_1.passengerInfoModel.find({ userId });
                return passengerInfo || [];
            }
            catch (error) {
                console.error("Error fetching passenger info:", error);
                throw new Error("Failed to fetch passenger information");
            }
        }),
    },
};
exports.default = passengerInfoResolver;
