import { IResolvers } from '@graphql-tools/utils';
import axios from 'axios';
import * as cheerio from 'cheerio';

const fetchFlightData = async (fromAirport: string, toAirport: string) => {
  console.log(fromAirport,toAirport)
    const URL = `https://www.cleartrip.com/flight-schedule/${fromAirport}-${toAirport}-flights.html`;

    try {
        const response = await axios.get(URL);
        const html:any = response.data;

        const $ = cheerio.load(html)

        const flights :any[]= [];

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
                price: parseFloat(price.replace(/,/g, '')) // Convert price to number
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
