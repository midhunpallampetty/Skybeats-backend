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
const bookingData_1 = require("../../models/bookingData");
const emailService_1 = require("../../services/emailService");
const flights_1 = require("../../models/flights");
const oneeightySeats_1 = require("../../models/oneeightySeats");
const twoeightySeats_1 = require("../../models/twoeightySeats");
const onetwentySeats_1 = require("../../models/onetwentySeats");
const returnFlightResolver = {
    Mutation: {
        createReturnBooking: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('createReturnBooking called with input:', args.input);
            console.log('Flight model:', args.flightModel);
            try {
                const flight = yield flights_1.flightmodel.findOne({ flightNumber: args.input.flightNumber });
                const alreadyBookedSeats = flight ? flight.seatsBooked : [];
                let seats;
                if (args.flightModel.includes('Boeing 737') || args.flightModel.includes('Airbus A320')) {
                    seats = yield oneeightySeats_1.oneeightyseatModel.find({ isBooked: false });
                }
                else if (args.flightModel.includes('Boeing') && !args.flightModel.includes('737')) {
                    seats = yield twoeightySeats_1.twoeightyseatModel.find({ isBooked: false });
                }
                else if (args.flightModel.includes('Airbus') && !args.flightModel.includes('320')) {
                    seats = yield twoeightySeats_1.twoeightyseatModel.find({ isBooked: false });
                }
                else {
                    seats = yield onetwentySeats_1.onetwentyseatModel.find({ isBooked: false });
                }
                const selectedSeatNumbers = args.input.seatNumber;
                const bookedSeats = [];
                if (selectedSeatNumbers && selectedSeatNumbers.length > 0) {
                    for (const seatId of selectedSeatNumbers) {
                        const seatExists = seats.find(seat => seat._id.toString() === seatId);
                        if (!seatExists || alreadyBookedSeats.includes(seatId)) {
                            throw new Error(`Seat number ${seatId} is already booked or does not exist.`);
                        }
                        seatExists.isBooked = true;
                        yield seatExists.save();
                        bookedSeats.push(seatId);
                    }
                }
                else {
                    const numberOfSeats = args.input.passengerName.length;
                    for (let i = 0; i < numberOfSeats; i++) {
                        let randomSeatIndex = randomSeat(seats);
                        while (seats[randomSeatIndex].isBooked || alreadyBookedSeats.includes(seats[randomSeatIndex]._id.toString())) {
                            randomSeatIndex = randomSeat(seats);
                        }
                        seats[randomSeatIndex].isBooked = true;
                        yield seats[randomSeatIndex].save();
                        bookedSeats.push(seats[randomSeatIndex]._id);
                    }
                }
                const flightNumber = args.input.flightNumber;
                const seatsBooked = args.input.seatNumber;
                const existingFlight = yield flights_1.flightmodel.findOne({ flightNumber });
                if (existingFlight) {
                    console.log('Flight found, updating seatsBooked array');
                    yield flights_1.flightmodel.findOneAndUpdate({ flightNumber }, { $addToSet: { seatsBooked: { $each: seatsBooked } } }, { new: true });
                }
                else {
                    console.log('Flight not found, creating new document');
                    const newFlightData = {
                        flightNumber,
                        seatsBooked
                    };
                    yield flights_1.flightmodel.create(newFlightData);
                }
                const newBookingData = Object.assign(Object.assign({}, args.input), { seatNumber: bookedSeats });
                const booking = new bookingData_1.bookingModel(newBookingData);
                const savedBooking = yield booking.save();
                yield (0, emailService_1.sendTicketEmail)(args.input.email, args.input.passengerName, args.input.flightNumber, args.input.departureAirport, args.input.arrivalAirport, args.input.departureTime, args.input.arrivalTime, args.input.FarePaid, args.input.ticketUrls);
                return savedBooking;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error in createReturnBooking:', error.message);
                    throw new Error('Error creating booking: ' + error.message);
                }
                else {
                    console.error('Error in createReturnBooking: An unknown error occurred');
                    throw new Error('Error creating booking: An unknown error occurred');
                }
            }
        }),
    },
};
function randomSeat(seats) {
    const randomIndex = Math.floor(Math.random() * seats.length);
    return randomIndex;
}
exports.default = returnFlightResolver;
