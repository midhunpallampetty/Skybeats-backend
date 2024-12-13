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
const transactionModel_1 = require("../../models/transactionModel");
const util_functions_nodejs_1 = __importDefault(require("util-functions-nodejs"));
const hotelBookingResolver = {
    Mutation: {
        createHotelBooking: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { input } = args;
                console.log(input, 'the dadgwefgtaa is here');
                const booking = new hotelBookingModel_1.hotelBookingModel(input);
                const savedBooking = yield booking.save();
                const trackingId = 'TRB' + util_functions_nodejs_1.default.generateOtp(12);
                const transactionData = {
                    userId: input.userId,
                    transactionType: 'hotel booking',
                    transactionId: trackingId,
                    status: 'success',
                    amount: input.amount
                };
                const saveTransaction = new transactionModel_1.transactionModel(transactionData);
                saveTransaction.save();
                return savedBooking;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error('Error creating booking: ' + error.message);
                }
                else {
                    throw new Error('Error creating booking: An unknown error occurred');
                }
            }
        }),
    },
    Query: {
        getAllHotelBooking: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId }) {
            try {
                const bookings = yield hotelBookingModel_1.hotelBookingModel.find({ userId });
                return bookings;
            }
            catch (error) {
                console.log('Error fetching booking data:', error);
                throw new Error('Error while getting data from booking service');
            }
        }),
        listAllHotels: (_1, args_1, _a) => __awaiter(void 0, [_1, args_1, _a], void 0, function* (_, args, { hotelModel }) {
            try {
                const hotels = yield hotelBookingModel_1.hotelBookingModel.find();
                return hotels;
            }
            catch (error) {
                console.error('Error fetching hotel data:', error);
                throw new Error('Error while fetching hotel data');
            }
        })
    },
};
exports.default = hotelBookingResolver;
