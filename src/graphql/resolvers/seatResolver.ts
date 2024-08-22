import axios from "axios";
import { Seat } from "../interfaces/Seat";
import { ApiResponse } from "../interfaces/ApiResponse";
import { SeatModel } from "../../models/Seats";
const seatResolvers = {
    Query: {
      getSeats: async () => {
        try {
          const seats = await SeatModel.find();
          return seats;
        } catch (error: any) {
          console.error('Error fetching seats:', error.message);
          throw new Error('Failed to fetch seats');
        }
      }
    },
}
export default seatResolvers;  