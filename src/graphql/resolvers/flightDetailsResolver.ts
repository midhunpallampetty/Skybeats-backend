import axios from 'axios';
import * as cheerio from 'cheerio';
import airline_codes from '../../utils/airline_codes.json';  // Import the updated JSON file

export const flightDetailsResolver = {
  Query: {
    async getAircraftModel(_: {}, { flightNumber, airline }: { flightNumber: string, airline: string }) {
      try {
        // Clean the flight number and airline inputs
        const cleanedFlightNumber = flightNumber.trim();
        let airlineInput = airline.trim().toLowerCase();

        // Search for the matching airline code using includes
        const foundAirline = airline_codes.find(a => airlineInput.includes(a.airlineName.toLowerCase()));

        // If the airline is not found, use a default response
        const airlineCode = foundAirline ? foundAirline.airlineCode : null;

        console.log('Airline Code:', airlineCode || "No valid airline found, defaulting to Airbus A350");
        console.log('Flight Number:', cleanedFlightNumber);

        if (!airlineCode) {
          // If no airline is found, return default aircraft information
          return {
            aircraftDetails: ["Airbus A350"]
          };
        }

        const url = `https://www.flightstats.com/v2/flight-tracker/${airlineCode}/${cleanedFlightNumber}`;
        console.log('Fetching URL:', url);

        // Fetch the webpage
        const response = await axios.get(url);
        const html: string = response.data;
        const $ = cheerio.load(html);

        const aircraftInfo: string[] = [];

        // Search for aircraft model information
        $('body').each((index, element) => {
          const text = $(element).text();

          // Regex to match common aircraft types (Airbus or Boeing)
          const regex = /(Airbus\s[A-Z0-9\-]+|Boeing\s[A-Z0-9\-]+)/g;
          const matches = text.match(regex);

          if (matches) {
            matches.forEach(match => {
              aircraftInfo.push(match.trim());
            });
          }
        });

        // Remove duplicates
        const uniqueAircraftInfo = [...new Set(aircraftInfo)];

        // Return the aircraft details, or a message if not found
        return {
          aircraftDetails: uniqueAircraftInfo.length > 0
            ? uniqueAircraftInfo
            : ["Aircraft model information not available"],
        };
      } catch (error) {
        console.error('Error fetching the webpage:', error);
        throw new Error('Failed to fetch aircraft model details. Please check the flight number and airline, then try again.');
      }
    }
  }
};

export default flightDetailsResolver;
