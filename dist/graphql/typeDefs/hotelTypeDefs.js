"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const hotelTypeDefs = (0, apollo_server_express_1.gql) `
  type GPSCoordinates {
    latitude: Float
    longitude: Float
  }

  type Rate {
    lowest: String
    extracted_lowest: Float
    before_taxes_fees: String
    extracted_before_taxes_fees: Float
  }

  type Price {
    amount: String
    currency: String
  }

  type NearbyPlace {
    name: String
    distance: String
  }

  type Image {
    url: String
    description: String
  }

  type Hotel {
    type: String
    name: String
    gps_coordinates: GPSCoordinates
    check_in_time: String
    check_out_time: String
    rate_per_night: Rate
    total_rate: Rate
    prices: [Price!]
    nearby_places: [NearbyPlace!]
    images: [Image!]
    overall_rating: Float
    reviews: Int
    location_rating: Float
    amenities: [String!]
    excluded_amenities: [String!]
    essential_info: [String!]
  }

  type Query {
    NearByHotels: [Hotel]
    HotelByLocation(city:String!): [Hotel]

  }
    
`;
exports.default = hotelTypeDefs;
