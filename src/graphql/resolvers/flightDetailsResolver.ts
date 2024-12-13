import axios from 'axios';
import * as cheerio from 'cheerio';
import airline_codes from '../../utils/airline_codes.json';  

export const flightDetailsResolver = {
  Query: {
    async getAircraftModel(_: {}, { flightNumber, airline }: { flightNumber: string, airline: string }) {
      try {
        
        const cleanedFlightNumber = flightNumber.trim();
        let airlineInput = airline.trim().toLowerCase();

        
        const foundAirline = airline_codes.find(a => airlineInput.includes(a.airlineName.toLowerCase()));

        
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

      
        const response = await axios.get(url);
        const html: string = response.data;
        const $ = cheerio.load(html);

        const aircraftInfo: string[] = [];

        
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
      } catch (error) {
        console.error('Error fetching the webpage:', error);
        throw new Error('Failed to fetch aircraft model details. Please check the flight number and airline, then try again.');
      }
    }
  }
};

export default flightDetailsResolver;
