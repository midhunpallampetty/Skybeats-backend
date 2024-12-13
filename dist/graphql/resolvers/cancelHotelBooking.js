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
const hotelBookingModel_1 = require("../../models/hotelBookingModel");
const userModel_1 = require("../../models/userModel");
const transactionModel_1 = require("../../models/transactionModel");
const util_functions_nodejs_1 = __importDefault(require("util-functions-nodejs"));
const cancelHotelResolver = {
    Mutation: {
        cancelHotel: (_, input) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                console.log(input.BookingId, ' dscdscv');
                const bookingData = yield hotelBookingModel_1.hotelBookingModel.findOne({ _id: input.BookingId });
                console.log(bookingData === null || bookingData === void 0 ? void 0 : bookingData.userId, bookingData === null || bookingData === void 0 ? void 0 : bookingData.amount);
                const user = yield userModel_1.UserModel.updateOne({ _id: bookingData === null || bookingData === void 0 ? void 0 : bookingData.userId }, { $inc: { walletBalance: bookingData === null || bookingData === void 0 ? void 0 : bookingData.amount } });
                bookingData.cancelled = true;
                bookingData === null || bookingData === void 0 ? void 0 : bookingData.save();
                console.log(user);
                const trackingId = 'HTL' + util_functions_nodejs_1.default.generateOtp(12);
                const transactionData = {
                    userId: bookingData === null || bookingData === void 0 ? void 0 : bookingData.userId,
                    transactionType: 'cancel',
                    transactionId: trackingId,
                    status: 'cancelled',
                    amount: bookingData === null || bookingData === void 0 ? void 0 : bookingData.amount
                };
                const saveTransaction = new transactionModel_1.transactionModel(transactionData);
                saveTransaction.save();
                return bookingData;
            }
            catch (error) {
                console.log('can not perform deletion operation');
            }
        })
    }
};
exports.default = cancelHotelResolver;
