export interface Hotel {
    type: string;
    name: string;
    gps_coordinates: GPSCoordinates | null;
    check_in_time: string;
    check_out_time: string;
    rate_per_night: Rate | null;
    total_rate: Rate | null;
    prices: Price[];
    nearby_places: NearbyPlace[];
    images: Image[];
    overall_rating: number;
    reviews: number;
    location_rating: number;
    amenities: string[];
    excluded_amenities: string[];
    essential_info: string[];
  }
  interface GPSCoordinates {
    latitude: number;
    longitude: number;
  }
  
  interface Rate {
    lowest: string;
    extracted_lowest: number;
    before_taxes_fees: string;
    extracted_before_taxes_fees: number;
  }
  
  interface Price {
    [key: string]: any;
  }
  
  interface NearbyPlace {
    [key: string]: any;
  }
  
  interface Image {
    [key: string]: any;
  }
  