import { IResolvers } from '@graphql-tools/utils';
import axios from 'axios';
import * as cheerio from 'cheerio';

const fetchFlightData = async (fromAirport: string, toAirport: string) => {
    console.log(fromAirport, toAirport);
    const URL = `https://www.cleartrip.com/flight-schedule/${fromAirport}-${toAirport}-flights.html`;

    try {
        const userAgents = [
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15",
            "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
        ];

        const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];

        // Await the response from axios.get
        const response = await axios.get(URL, {
            headers: {
                'User-Agent': randomUserAgent,
            },
        });

        console.log('type of response', typeof response.data);
        const html: any = response.data;

        const $ = cheerio.load(html);

        const flights: any[] = [];

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
