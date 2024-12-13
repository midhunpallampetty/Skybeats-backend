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
const bookingData_1 = require("../../models/bookingData");
const userModel_1 = require("../../models/userModel");
const transactionModel_1 = require("../../models/transactionModel");
const util_functions_nodejs_1 = __importDefault(require("util-functions-nodejs"));
const cancelBookingResolver = {
    Mutation: {
        CancelTicketById: (_, input) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                console.log(input.BookingId, ' dscdscv');
                const bookingData = yield bookingData_1.bookingModel.findOne({ _id: input.BookingId });
                console.log(bookingData === null || bookingData === void 0 ? void 0 : bookingData.userId, bookingData === null || bookingData === void 0 ? void 0 : bookingData.FarePaid);
                const user = yield userModel_1.UserModel.updateOne({ _id: bookingData === null || bookingData === void 0 ? void 0 : bookingData.userId }, { $inc: { walletBalance: bookingData === null || bookingData === void 0 ? void 0 : bookingData.FarePaid } });
                bookingData.cancelled = true;
                bookingData === null || bookingData === void 0 ? void 0 : bookingData.save();
                console.log(user);
                const trackingId = 'TRB' + util_functions_nodejs_1.default.generateOtp(12);
                const transactionData = {
                    userId: bookingData === null || bookingData === void 0 ? void 0 : bookingData.userId,
                    transactionType: 'cancel',
                    transactionId: trackingId,
                    status: 'success',
                    amount: bookingData === null || bookingData === void 0 ? void 0 : bookingData.FarePaid
                };
                const saveTransaction = new transactionModel_1.transactionModel(transactionData);
                saveTransaction.save();
                return bookingData;
            }
            catch (error) {
                console.log('can not perform deletion operation');
            }
        }),
        CancelTicketByOne: (_, input) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const booking = yield bookingData_1.bookingModel.findOne({ _id: input.BookingId });
                if (!booking)
                    throw new Error("Booking not found");
                console.log(booking.seatNumber, 'Current seats:', input.seatNumber);
                const seatExists = booking.seatNumber.includes(input.seatNumber);
                if (!seatExists)
                    throw new Error(`Seat number ${input.seatNumber} not found in booking`);
                if (!booking.cancelledSeats)
                    booking.cancelledSeats = [];
                if (booking.cancelledSeats.includes(input.seatNumber)) {
                    throw new Error(`Seat number ${input.seatNumber} has already been canceled.`);
                }
                booking.cancelledSeats.push(input.seatNumber);
                yield bookingData_1.bookingModel.updateOne({ _id: input.BookingId }, { $set: { cancelledSeats: booking.cancelledSeats } }, { upsert: true });
                const trackingId = 'TRB' + util_functions_nodejs_1.default.generateOtp(12);
                const amount = booking === null || booking === void 0 ? void 0 : booking.FarePaid;
                const newRefund = amount / booking.seatNumber.length;
                const transactionData = {
                    userId: booking === null || booking === void 0 ? void 0 : booking.userId,
                    transactionType: 'cancel',
                    transactionId: trackingId,
                    status: 'success',
                    amount: newRefund
                };
                const saveTransaction = new transactionModel_1.transactionModel(transactionData);
                saveTransaction.save();
                console.log(transactionData);
                return booking;
            }
            catch (error) {
                console.error("Error cancelling seat:", error);
                throw new Error("Could not cancel seat");
            }
        })
    }
};
exports.default = cancelBookingResolver;
