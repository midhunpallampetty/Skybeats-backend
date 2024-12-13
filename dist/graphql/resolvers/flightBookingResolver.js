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
const emailService_1 = require("../../services/emailService");
const flights_1 = require("../../models/flights");
const oneeightySeats_1 = require("../../models/oneeightySeats");
const twoeightySeats_1 = require("../../models/twoeightySeats");
const onetwentySeats_1 = require("../../models/onetwentySeats");
const util_functions_nodejs_1 = __importDefault(require("util-functions-nodejs"));
const transactionModel_1 = require("../../models/transactionModel");
const flightBookingResolver = {
    Mutation: {
        createBooking: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            console.log('createBooking function called');
            console.log(args.input, 'inputgreg');
            console.log(args.flightModel, 'flightModel');
            try {
                let seats;
                const trackingId = 'TRB' + util_functions_nodejs_1.default.generateOtp(12);
                const transactionData = {
                    userId: args.input.userId,
                    transactionType: 'success',
                    transactionId: trackingId,
                    status: 'success',
                    amount: args.input.FarePaid,
                };
                const saveTransaction = new transactionModel_1.transactionModel(transactionData);
                saveTransaction.save();
                if (args.flightModel.includes('Boeing 737') || args.flightModel.includes('Airbus A320')) {
                    console.log(args.flightModel, 'Validating seat with 180-seat configuration');
                    seats = yield oneeightySeats_1.oneeightyseatModel.find({ isBooked: false });
                }
                else if (args.flightModel.includes('Boeing') && !args.flightModel.includes('737')) {
                    console.log(args.flightModel, 'Validating seat with 280-seat configuration');
                    seats = yield twoeightySeats_1.twoeightyseatModel.find({ isBooked: false });
                }
                else if (args.flightModel.includes('Airbus') && !args.flightModel.includes('320')) {
                    console.log(args.flightModel, 'Validating seat with 280-seat configuration');
                    seats = yield twoeightySeats_1.twoeightyseatModel.find({ isBooked: false });
                }
                else {
                    console.log(args.flightModel, 'Validating seat with 120-seat configuration');
                    seats = yield onetwentySeats_1.onetwentyseatModel.find({ isBooked: false });
                }
                const selectedSeatNumbers = args.input.seatNumber;
                const bookedSeats = [];
                if (selectedSeatNumbers && selectedSeatNumbers.length > 0) {
                    for (const seatId of selectedSeatNumbers) {
                        const seatExists = seats.find(seat => seat._id.toString() === seatId);
                        if (!seatExists) {
                            throw new Error(`Provided seat number ${seatId} does not exist or is already booked.`);
                        }
                        yield seatExists.save();
                        bookedSeats.push(seatId);
                    }
                }
                else {
                    let number = Math.floor(Math.random() * seats.length);
                    while (seats[number].isBooked) {
                        number = Math.floor(Math.random() * seats.length);
                    }
                    seats[number].isBooked = true;
                    yield seats[number].save();
                    bookedSeats.push(seats[number]._id);
                }
                const { input } = args;
                const flightNumber = input.flightNumber;
                const seatsBooked = input.seatNumber;
                console.log('Searching for existing flight with flightNumber:', flightNumber);
                const existingFlight = yield flights_1.flightmodel.findOne({ flightNumber });
                console.log(existingFlight, 'existing flight');
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
                const newBookingData = Object.assign(Object.assign({}, input), { seatNumber: bookedSeats });
                const booking = new bookingData_1.bookingModel(newBookingData);
                const savedBooking = yield booking.save();
                const mainUser = (_a = input.passengerName) === null || _a === void 0 ? void 0 : _a[0];
                console.log(mainUser.toString(), 'hai');
                yield (0, emailService_1.sendTicketEmail)(input.email, input.passengerName, input.flightNumber, input.departureAirport, input.arrivalAirport, input.departureTime, input.arrivalTime, input.FarePaid, input.ticketUrls);
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
        getAllBooking: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const bookings = yield bookingData_1.bookingModel.find();
                console.log(bookings);
                return bookings;
            }
            catch (error) {
                console.log('error fetching booking data');
                throw new Error('Error while getting data from booking service');
            }
        }),
        getBookingById: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId }) {
            try {
                const bookings = yield bookingData_1.bookingModel.find({ userId: userId }).sort({ createdAt: -1 });
                console.log(bookings);
                if (!bookings || bookings.length === 0) {
                    throw new Error('No bookings found for this user');
                }
                return bookings;
            }
            catch (error) {
                console.error('Error fetching bookings:', error);
                throw new Error('Error fetching bookings');
            }
        }),
        getRandomSeat: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('getRandomSeat function called');
            console.log(args.flightModel, 'flightModel');
            try {
                let seats;
                if (args.flightModel.includes('Boeing 737') || args.flightModel.includes('Airbus A320')) {
                    console.log(args.flightModel, 'Fetching from 180-seat configuration');
                    seats = yield oneeightySeats_1.oneeightyseatModel.find({ isBooked: false });
                }
                else if (args.flightModel.includes('Boeing') && !args.flightModel.includes('737')) {
                    console.log(args.flightModel, 'Fetching from 280-seat configuration');
                    seats = yield twoeightySeats_1.twoeightyseatModel.find({ isBooked: false });
                }
                else if (args.flightModel.includes('Airbus') && !args.flightModel.includes('320')) {
                    console.log(args.flightModel, 'Fetching from 280-seat configuration');
                    seats = yield twoeightySeats_1.twoeightyseatModel.find({ isBooked: false });
                }
                else {
                    console.log(args.flightModel, 'Fetching from 120-seat configuration');
                    seats = yield onetwentySeats_1.onetwentyseatModel.find({ isBooked: false });
                }
                if (!seats || seats.length === 0) {
                    throw new Error('No available seats for this flight model.');
                }
                const randomIndex = Math.floor(Math.random() * seats.length);
                const selectedSeat = seats[randomIndex];
                console.log('Random seat found:', selectedSeat);
                return {
                    seatId: selectedSeat._id,
                    row: selectedSeat.row,
                    col: selectedSeat.col,
                    class: selectedSeat.class,
                };
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error fetching random seat:', error.message);
                    throw new Error('Error fetching random seat: ' + error.message);
                }
                else {
                    console.error('Error fetching random seat: An unknown error occurred');
                    throw new Error('Error fetching random seat: An unknown error occurred');
                }
            }
        }),
    },
};
exports.default = flightBookingResolver;
