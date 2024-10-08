import { checkseatModel } from "../../models/checkSeat";

// Update the CheckSeat interface to indicate that holdSeatId is an array of strings
;

interface CheckSeatInput {
  holdSeatId: string[];
  aircraftId: string;
  userId: string;
}


const checkSeatsResolver = {
  Mutation: {
    holdSeat: async (_: {}, args: { input: CheckSeatInput }) => {
      try {
        const { holdSeatId, aircraftId, userId } = args.input;

        // Check if any of the seats are already held
        const alreadyHeldSeats = await checkseatModel.find({
          aircraftId: aircraftId,    
          holdSeatId: { $in: holdSeatId }  
        });
        
console.log(alreadyHeldSeats,'already')
        if (alreadyHeldSeats.length > 0) {
          console.log('Some seats are already held:', alreadyHeldSeats);
          const heldSeatIds = alreadyHeldSeats.map(seat => seat.holdSeatId);
          throw new Error(`One or more seats are already held: ${heldSeatIds.join(', ')}`);
        }

        // Save each seat separately
        const newCheckSeats = holdSeatId.map(seatId => ({
          holdSeatId: seatId,
          aircraftId,
          userId
        }));

        const savedCheckSeats = await checkseatModel.insertMany(newCheckSeats);
        return savedCheckSeats;
      } catch (error: any) {
        console.error('Error saving seats:', error.message);
        throw new Error('Failed to save seat data');
      }
    
    },
    
   
    
    checkSeat: async (_: any, args: { input: CheckSeatInput }) => {
      try {
        console.log(typeof args.input.holdSeatId);
        // Find a document with the given holdSeatId and aircraftId
        const existingSeat = await checkseatModel.findOne({
          holdSeatId: { $in: args.input.holdSeatId }, // Use $in to check against an array
        });
     
        console.log(existingSeat?.aircraftId);
        
        if(existingSeat && existingSeat.aircraftId === args.input.aircraftId && existingSeat.userId !== args.input.userId) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Error checking seat:', error);
        throw new Error('Failed to check seat');
      }
    },
  },
};

export default checkSeatsResolver;
