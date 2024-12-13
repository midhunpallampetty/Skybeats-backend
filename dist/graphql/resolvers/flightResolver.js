"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const fetchFlightData = (fromAirport, toAirport) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(fromAirport, toAirport);
    const URL = `https://www.cleartrip.com/flight-schedule/${fromAirport}-${toAirport}-flights.html`;
    try {
        const response = yield axios_1.default.get(URL);
        console.log('type of response', typeof response.data);
        const html = response.data;
        const $ = cheerio.load(html);
        const flights = [];
        $('.list-inline.owd-mbento').each((index, element) => {
            const airline = $(element).find('.owd-airline-names').text().trim();
            const flightNumber = $(element).find('.owd-airline-names small').text().trim();
            const departureTime = $(element).find('.owd-mtiming').text().trim();
            const departureAirport = $(element).find('.owd-mtiming .owd-mdcity').first().text().trim();
            const arrivalTime = $(element).find('.own-mtiming').text().trim();
            const arrivalAirport = $(element).find('.own-mtiming .owd-macity').first().text().trim();
            const duration = $(element).find('.mstop-duration').text().trim();
            const stops = $(element).find('.mstop-info').text().trim();
            const price = $(element).find('.t-blcok').text().trim().replace('₹', '');
            flights.push({
                airline,
                flightNumber,
                departureTime,
                departureAirport,
                arrivalTime,
                arrivalAirport,
                duration,
                stops,
                price: parseFloat(price.replace(/,/g, '')),
            });
        });
        return flights;
    }
    catch (error) {
        console.error('Error fetching webpage data:', error);
        return [];
    }
});
const flightResolvers = {
    Query: {
        searchFlights: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { fromAirport, toAirport }) {
            const flights = yield fetchFlightData(fromAirport, toAirport);
            return flights;
        }),
    },
};
exports.default = flightResolvers;
