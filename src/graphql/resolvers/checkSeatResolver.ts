import { GraphQLResolveInfo } from "graphql";
import { checkseatModel } from "../../models/checkSeat"; // Import the Mongoose model
import { Context } from "../interfaces/context"; // Define a context type for user info
import { Document, Model } from "mongoose";


interface SeatDocument extends Document {
  holdSeatId: string;
  aircraftId: string;
  userId: string;
  sessionId: string;
  status: "held" | "booked" | "released";
  createdAt: Date;
}


type SeatModel = Model<SeatDocument>;

interface SeatInput {
  holdSeatId: string;
  aircraftId: string;
  sessionId?: string;
  userId:string;
}

const checkSeatsResolver = {
  Query: {
    
    checkSeat: async (
      _: unknown,
      { holdSeatId, aircraftId }: { holdSeatId: string; aircraftId: string },
      context: Context,
      info: GraphQLResolveInfo
    ): Promise<boolean> => {
      try {
        const seat = await checkseatModel.findOne({ holdSeatId, aircraftId });
        return !!seat; 
      } catch (error) {
        console.error(error);
        throw new Error("Failed to check seat availability.");
      }
    },
  },

  Mutation: {
    
    holdSeats: async (
      _: unknown,
      { holdSeatIds, aircraftId, sessionId, userId }: { holdSeatIds: string[]; aircraftId: string; sessionId: string; userId: string },
      
    ): Promise<SeatDocument[]> => {
      try {
        const heldSeats: SeatDocument[] = [];
        const bulkOperations = []; 
    
        for (const holdSeatId of holdSeatIds) {
          
          const existingHold = await checkseatModel.findOne({ holdSeatId, aircraftId });
    
          if (existingHold) {
            throw new Error(`Seat ${holdSeatId} is already held.`);
          }
    
          
          bulkOperations.push({
            insertOne: {
              document: {
                holdSeatId,
                aircraftId,
                sessionId,
                userId,
                status: 'held',
                createdAt: new Date(), 
              },
            },
          });
        }
    
        
        if (bulkOperations.length > 0) {
          const result = await checkseatModel.bulkWrite(bulkOperations);
    
          
          const insertedIds = Object.values(result.insertedIds); 
          const insertedDocuments = await checkseatModel.find({ _id: { $in: insertedIds } });
    
          heldSeats.push(...insertedDocuments); 
        }
    
        return heldSeats; 
      } catch (error) {
        console.error(error);
        throw new Error('Failed to hold the seats.');
      }
    },
    
    

    
    releaseSeat: async (
      _: unknown,
      { holdSeatId, aircraftId }: { holdSeatId: string; aircraftId: string },
      context: Context,
      info: GraphQLResolveInfo
    ): Promise<boolean> => {
      const userId = context.user?.id; 
      if (!userId) throw new Error("User not authenticated.");

      try {
        const seat = await checkseatModel.findOneAndDelete({
          holdSeatId,
          aircraftId,
          userId,
        });

        if (!seat) {
          throw new Error("No held seat found to release.");
        }

        return true; 
      } catch (error) {
        console.error(error);
        throw new Error("Failed to release the seat.");
      }
    },
  },
};

export default checkSeatsResolver;
