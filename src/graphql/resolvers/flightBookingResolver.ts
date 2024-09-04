import { bookingModel } from "../../models/bookingData";
import { sendTicketEmail } from "../../services/emailService";
import { BookingInput } from "../interfaces/BookingInput";
import { SeatModel } from "../../models/Seats";
const flightBookingResolver = {
  Mutation: {
    createBooking: async (_: {}, args: { input: BookingInput }) => {
      try {
        const seats = await SeatModel.find()
        let number=3
        console.log(seats[number],'test seats')
        if(seats[number].isBooked){
          number=randomSeat(seats);
        }
        const { input } = args;
        const newBookingData={...input,seatNumber:seats[number]._id}
        const booking = new bookingModel(newBookingData);
        const savedBooking = await booking.save();
        await sendTicketEmail(input.email);
        return savedBooking;
      } catch (error: any) {
        throw new Error('Error creating booking: ' + error.message);
      }
    },

  },
  Query: {
    getAllBooking: async () => {
      try {
        const bookings = await bookingModel.find()
        return bookings;
      } catch (error) {
        console.log('error fetching booking data')
        throw new Error('Error while getting data from booking service');

      }
    }
  },
};
function randomSeat(seat: any) {


  const randomNo = Math.floor(Math.random() * seat.length)
  return randomNo;
}



export default flightBookingResolver;