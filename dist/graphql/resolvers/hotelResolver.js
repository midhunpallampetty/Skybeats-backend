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
const axios_1 = __importDefault(require("axios"));
const util_functions_nodejs_1 = __importDefault(require("util-functions-nodejs"));
let mycity = '';
const currentcity = axios_1.default.get('https://ipinfo.io').then((response) => {
    mycity = response.data.city;
});
console.log(mycity);
const hotelResolvers = {
    Query: {
        NearByHotels: () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield axios_1.default.get('https://serpapi.com/search', {
                    params: {
                        engine: 'google_hotels',
                        q: mycity,
                        check_in_date: util_functions_nodejs_1.default.getDate(0),
                        check_out_date: util_functions_nodejs_1.default.getDate(1),
                        api_key: process.env.SERPAPI_KEY,
                        currency: 'INR',
                    },
                });
                const properties = response.data.properties;
                if (!Array.isArray(properties)) {
                    console.warn('No properties found in the API response.');
                    return [];
                }
                const hotels = properties.map((hotel) => ({
                    type: hotel.type || 'unknown',
                    name: hotel.name || 'No name provided',
                    gps_coordinates: hotel.gps_coordinates ? {
                        latitude: hotel.gps_coordinates.latitude,
                        longitude: hotel.gps_coordinates.longitude,
                    } : null,
                    check_in_time: hotel.check_in_time || 'Not specified',
                    check_out_time: hotel.check_out_time || 'Not specified',
                    rate_per_night: hotel.rate_per_night ? {
                        lowest: hotel.rate_per_night.lowest || 'N/A',
                        extracted_lowest: hotel.rate_per_night.extracted_lowest || 0,
                        before_taxes_fees: hotel.rate_per_night.before_taxes_fees || 'N/A',
                        extracted_before_taxes_fees: hotel.rate_per_night.extracted_before_taxes_fees || 0,
                    } : null,
                    total_rate: hotel.total_rate ? {
                        lowest: hotel.total_rate.lowest || 'N/A',
                        extracted_lowest: hotel.total_rate.extracted_lowest || 0,
                        before_taxes_fees: hotel.total_rate.before_taxes_fees || 'N/A',
                        extracted_before_taxes_fees: hotel.total_rate.extracted_before_taxes_fees || 0,
                    } : null,
                    prices: hotel.prices || [],
                    nearby_places: hotel.nearby_places || [],
                    images: hotel.images || [],
                    overall_rating: hotel.overall_rating || 0,
                    reviews: hotel.reviews || 0,
                    location_rating: hotel.location_rating || 0,
                    amenities: hotel.amenities || [],
                    excluded_amenities: hotel.excluded_amenities || [],
                    essential_info: hotel.essential_info || [],
                }));
                return hotels;
            }
            catch (error) {
                if (error instanceof Error) {
                    const isAxiosError = (err) => "response" in err;
                    const errorMessage = isAxiosError(error) && ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data)
                        ? error.response.data
                        : error.message;
                    console.error('Error fetching hotels:', errorMessage);
                    throw new Error('Failed to fetch nearby hotels');
                }
                else {
                    console.error('Error fetching hotels: An unknown error occurred');
                    throw new Error('Failed to fetch nearby hotels');
                }
            }
        }),
        HotelByLocation: (_, city) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get('https://serpapi.com/search', {
                    params: {
                        engine: 'google_hotels',
                        q: city,
                        check_in_date: util_functions_nodejs_1.default.getDate(0),
                        check_out_date: util_functions_nodejs_1.default.getDate(1),
                        api_key: process.env.SERPAPI_KEY,
                        currency: 'INR',
                    },
                });
                const properties = response.data.properties;
                console.log(properties);
                if (!Array.isArray(properties)) {
                    console.warn('No properties found in the API response.');
                    return [];
                }
                const hotels = properties.map((hotel) => ({
                    type: hotel.type || 'unknown',
                    name: hotel.name || 'No name provided',
                    gps_coordinates: hotel.gps_coordinates ? {
                        latitude: hotel.gps_coordinates.latitude,
                        longitude: hotel.gps_coordinates.longitude,
                    } : null,
                    check_in_time: hotel.check_in_time || 'Not specified',
                    check_out_time: hotel.check_out_time || 'Not specified',
                    rate_per_night: hotel.rate_per_night ? {
                        lowest: hotel.rate_per_night.lowest || 'N/A',
                        extracted_lowest: hotel.rate_per_night.extracted_lowest || 0,
                        before_taxes_fees: hotel.rate_per_night.before_taxes_fees || 'N/A',
                        extracted_before_taxes_fees: hotel.rate_per_night.extracted_before_taxes_fees || 0,
                    } : null,
                    total_rate: hotel.total_rate ? {
                        lowest: hotel.total_rate.lowest || 'N/A',
                        extracted_lowest: hotel.total_rate.extracted_lowest || 0,
                        before_taxes_fees: hotel.total_rate.before_taxes_fees || 'N/A',
                        extracted_before_taxes_fees: hotel.total_rate.extracted_before_taxes_fees || 0,
                    } : null,
                    prices: hotel.prices || [],
                    nearby_places: hotel.nearby_places || [],
                    images: hotel.images || [],
                    overall_rating: hotel.overall_rating || 0,
                    reviews: hotel.reviews || 0,
                    location_rating: hotel.location_rating || 0,
                    amenities: hotel.amenities || [],
                    excluded_amenities: hotel.excluded_amenities || [],
                    essential_info: hotel.essential_info || [],
                }));
                console.log(hotels);
                return hotels;
            }
            catch (error) {
                if (error instanceof Error) {
                    const hasResponse = error.response;
                    const errorMessage = (hasResponse === null || hasResponse === void 0 ? void 0 : hasResponse.data) || error.message;
                    console.error('Error fetching hotels:', errorMessage);
                    throw new Error('Failed to fetch nearby hotels');
                }
                else {
                    console.error('Error fetching hotels: An unknown error occurred');
                    throw new Error('Failed to fetch nearby hotels');
                }
            }
        }),
    }
};
exports.default = hotelResolvers;
