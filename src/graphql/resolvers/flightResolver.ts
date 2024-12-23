import { IResolvers } from '@graphql-tools/utils';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { HttpsProxyAgent } from 'https-proxy-agent';
interface Flight {
    airline: string;
    flightNumber: string | number;
    departureTime: string;
    departureAirport: string;
    arrivalTime: string;
    arrivalAirport: string;
    duration: string;
    stops: string;
    price: number;
  }
const fetchFlightData = async (fromAirport: string, toAirport: string) => {
    console.log(fromAirport, toAirport);
    const URL = `https://www.cleartrip.com/flight-schedule/${fromAirport}-${toAirport}-flights.html`;

    try {
       
     

        const response = await axios.get(URL)

        console.log('type of response', typeof response.data);
        const html: string = response.data;

        const $ = cheerio.load(html);

        const flights: Flight[] = [];

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

    } catch (error) {
        console.error('Error fetching webpage data:', error);
        return [];
    }
};

const flightResolvers: IResolvers = {
    Query: {
        searchFlights: async (_, { fromAirport, toAirport }) => {
            const flights = await fetchFlightData(fromAirport, toAirport);
            return flights;
        },
    },
};

export default flightResolvers;
