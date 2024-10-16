import axios from 'axios';
import * as cheerio from 'cheerio';

export const flightDetailsResolver = {
  Query: {
    async getAircraftModel(_: any, { flightNumber }: { flightNumber: string }) {
    //     const dataAirline=JSON.parse(JSON.stringify(flightNumber)).trim();
    //     let code=[]
    //     const cleanedFlightString = dataAirline.replace(/\s+/g, ' ').trim();
    // for(let i of dataAirline){
    //     if(i !=' ' && i!='-'){
    //         code.push(i)
    //     }

    // }
    // const flightParts = code.toString().split('\n');
   const airlinecode="6E";
   const aircraftNumber='1475';
    
    console.log(airlinecode);
    console.log(aircraftNumber)
                 
        
      const url = `https://www.flightstats.com/v2/flight-tracker/${airlinecode}/${aircraftNumber}`;
      try {
        // Fetch the webpage
        const response = await axios.get(url);
        const html:any = response.data;
        const $ = cheerio.load(html);

        const aircraftInfo: string[] = [];
        $('body').each((index, element) => {
          const text = $(element).text();

          // Regex to match common aircraft types (Airbus or Boeing)
          const regex = /(Airbus\s[A-Z0-9\-]+|Boeing\s[A-Z0-9\-]+[\s\S]*?)/g;
          const matches = text.match(regex);

          if (matches) {
            matches.forEach(match => {
              aircraftInfo.push(match.trim());
            });
          }
        });

        // Remove duplicates
        const uniqueAircraftInfo = [...new Set(aircraftInfo)];

        // Return the aircraft details
        if (uniqueAircraftInfo.length === 0) {
            return { aircraftDetails: ["Aircraft model information not available"] };
          } else {
            return { aircraftDetails: uniqueAircraftInfo };
          }
      } catch (error) {
        console.error('Error fetching the webpage:', error);
        throw new Error('Failed to fetch aircraft model');
      }
    }
  }
};
export default flightDetailsResolver;