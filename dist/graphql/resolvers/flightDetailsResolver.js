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
exports.flightDetailsResolver = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const airline_codes_json_1 = __importDefault(require("../../utils/airline_codes.json"));
exports.flightDetailsResolver = {
    Query: {
        getAircraftModel(_1, _a) {
            return __awaiter(this, arguments, void 0, function* (_, { flightNumber, airline }) {
                try {
                    const cleanedFlightNumber = flightNumber.trim();
                    let airlineInput = airline.trim().toLowerCase();
                    const foundAirline = airline_codes_json_1.default.find(a => airlineInput.includes(a.airlineName.toLowerCase()));
                    const airlineCode = foundAirline ? foundAirline.airlineCode : null;
                    console.log('Airline Code:', airlineCode || "No valid airline found, defaulting to Airbus A350");
                    console.log('Flight Number:', cleanedFlightNumber);
                    if (!airlineCode) {
                        return {
                            aircraftDetails: ["Airbus A350"]
                        };
                    }
                    const url = `https://www.flightstats.com/v2/flight-tracker/${airlineCode}/${cleanedFlightNumber}`;
                    console.log('Fetching URL:', url);
                    const response = yield axios_1.default.get(url);
                    const html = response.data;
                    const $ = cheerio.load(html);
                    const aircraftInfo = [];
                    $('body').each((index, element) => {
                        const text = $(element).text();
                        const regex = /(Airbus\s[A-Z0-9\-]+|Boeing\s[A-Z0-9\-]+)/g;
                        const matches = text.match(regex);
                        if (matches) {
                            matches.forEach(match => {
                                aircraftInfo.push(match.trim());
                            });
                        }
                    });
                    const uniqueAircraftInfo = [...new Set(aircraftInfo)];
                    return {
                        aircraftDetails: uniqueAircraftInfo.length > 0
                            ? uniqueAircraftInfo
                            : ["Aircraft model information not available"],
                    };
                }
                catch (error) {
                    console.error('Error fetching the webpage:', error);
                    throw new Error('Failed to fetch aircraft model details. Please check the flight number and airline, then try again.');
                }
            });
        }
    }
};
exports.default = exports.flightDetailsResolver;
