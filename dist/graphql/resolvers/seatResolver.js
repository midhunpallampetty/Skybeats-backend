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
const onetwentySeats_1 = require("../../models/onetwentySeats");
const twoeightySeats_1 = require("../../models/twoeightySeats");
const oneeightySeats_1 = require("../../models/oneeightySeats");
const flights_1 = require("../../models/flights");
const seatResolvers = {
    Query: {
        getSeats: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { flightNumber, flightModel }) {
            try {
                const flight = yield flights_1.flightmodel.findOne({ flightNumber });
                console.log(flightNumber, flightModel, 'Fetching flight details');
                let bookedSeatIds = [];
                let allSeats;
                if (flight) {
                    bookedSeatIds = flight.seatsBooked || [];
                }
                else {
                    console.log('Flight not found, returning all seats without any bookings.');
                }
                if (flightModel.includes('Boeing 737') || flightModel.includes('Airbus A320')) {
                    console.log(flightModel, 'Setting seat count to 180');
                    allSeats = yield oneeightySeats_1.oneeightyseatModel.find();
                }
                else if (flightModel.includes('Boeing') && !flightModel.includes('737')) {
                    console.log(flightModel, 'Setting seat count to 280');
                    allSeats = yield twoeightySeats_1.twoeightyseatModel.find();
                }
                else if (flightModel.includes('Airbus') && !flightModel.includes('320')) {
                    console.log(flightModel, 'Setting seat count to 280');
                    allSeats = yield twoeightySeats_1.twoeightyseatModel.find();
                }
                else {
                    console.log(flightModel, 'Setting seat count to 120');
                    allSeats = yield onetwentySeats_1.onetwentyseatModel.find();
                }
                const seatsWithBookingStatus = allSeats.map(seat => {
                    const isBooked = bookedSeatIds.includes(seat._id.toString());
                    return Object.assign(Object.assign({}, seat.toObject()), { isBooked });
                });
                // console.log(seatsWithBookingStatus, 'Processed seats with booking status');
                return seatsWithBookingStatus;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error fetching seats:', error.message);
                    throw new Error('Failed to fetch seats');
                }
                else {
                    console.error('Error fetching seats: An unknown error occurred');
                    throw new Error('Failed to fetch seats: An unknown error occurred');
                }
            }
        })
    },
};
exports.default = seatResolvers;
