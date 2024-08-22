import axios from "axios";
import util from 'util-functions-nodejs'
import { Locationresponse } from "../interfaces/Locationresponse";
import { ApiResponse } from "../interfaces/ApiResponse";
import { Hotel } from "../interfaces/Hotel";
let mycity: string = '';
const currentcity: any = axios.get<Locationresponse>('https://ipinfo.io').then((response) => {
  mycity = response.data.city;
})
console.log(mycity)



const hotelResolvers = {
  Query: {
    NearByHotels: async () => {
      try {
        const response = await axios.get<ApiResponse>('https://serpapi.com/search', {
          params: {
            engine: 'google_hotels',
            q: mycity,
            check_in_date: util.getDate(0),
            check_out_date: util.getDate(1),
            api_key: process.env.SERPAPI_KEY,
            currency:'INR',
          },
        });

        const properties = response.data.properties;

        if (!Array.isArray(properties)) {
          console.warn('No properties found in the API response.');
          return [];
        }

        const hotels: Hotel[] = properties.map((hotel: any) => ({
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
      } catch (error: any) {
        console.error('Error fetching hotels:', error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch nearby hotels');
      }
    },
    HotelByLocation: async (_:any,city:String) => {
      try {
        const response = await axios.get<ApiResponse>('https://serpapi.com/search', {
          params: {
            engine: 'google_hotels',
            q: city,
            check_in_date: util.getDate(0),
            check_out_date: util.getDate(1),
            api_key: process.env.SERPAPI_KEY,
            currency:'INR',
          },
        });
       
        const properties = response.data.properties;
        console.log(properties);

        if (!Array.isArray(properties)) {
          console.warn('No properties found in the API response.');
          return [];
        }

        const hotels: Hotel[] = properties.map((hotel: any) => ({
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
      } catch (error: any) {
        console.error('Error fetching hotels:', error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch nearby hotels');
      }
    },




  }
};

export default hotelResolvers;
