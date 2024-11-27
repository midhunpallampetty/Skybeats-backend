import { GraphQLResolveInfo } from "graphql";
import { checkseatModel } from "../../models/checkSeat"; // Import the Mongoose model
import { Context } from "../interfaces/context"; // Define a context type for user info
import { Document, Model } from "mongoose";

// Define the shape of a seat document
interface SeatDocument extends Document {
  holdSeatId: string;
  aircraftId: string;
  userId: string;
  sessionId: string;
  status: "held" | "booked" | "released";
  createdAt: Date;
}

// The Mongoose model type for the seat
type SeatModel = Model<SeatDocument>;

interface SeatInput {
  holdSeatId: string;
  aircraftId: string;
  sessionId?: string;
  userId:string;
}

const checkSeatsResolver = {
  Query: {
    // Check if a seat is held or available
    checkSeat: async (
      _: unknown,
      { holdSeatId, aircraftId }: { holdSeatId: string; aircraftId: string },
      context: Context,
      info: GraphQLResolveInfo
    ): Promise<boolean> => {
      try {
        const seat = await checkseatModel.findOne({ holdSeatId, aircraftId });
        return !!seat; // Return true if the seat is held
      } catch (error) {
        console.error(error);
        throw new Error("Failed to check seat availability.");
      }
    },
  },

  Mutation: {
    // Hold a seat for a user
    holdSeats: async (
      _: unknown,
      { holdSeatIds, aircraftId, sessionId, userId }: { holdSeatIds: string[]; aircraftId: string; sessionId: string; userId: string },
      context: any
    ): Promise<SeatDocument[]> => {
      try {
        const heldSeats: SeatDocument[] = [];
        const bulkOperations = []; // Array to hold MongoDB bulk write operations
    
        for (const holdSeatId of holdSeatIds) {
          // Check if the seat is already held
          const existingHold = await checkseatModel.findOne({ holdSeatId, aircraftId });
    
          if (existingHold) {
            throw new Error(`Seat ${holdSeatId} is already held.`);
          }
    
          // Prepare a new hold document for bulk write
          bulkOperations.push({
            insertOne: {
              document: {
                holdSeatId,
                aircraftId,
                sessionId,
                userId,
                status: 'held',
                createdAt: new Date(), // Ensure TTL works as expected
              },
            },
          });
        }
    
        // Perform all insert operations in bulk for efficiency
        if (bulkOperations.length > 0) {
          const result = await checkseatModel.bulkWrite(bulkOperations);
    
          // Collect the inserted IDs and fetch the documents from the database
          const insertedIds = Object.values(result.insertedIds); // Extract the inserted IDs
          const insertedDocuments = await checkseatModel.find({ _id: { $in: insertedIds } });
    
          heldSeats.push(...insertedDocuments); // Collect the successfully inserted documents
        }
    
        return heldSeats; // Return all held seats
      } catch (error) {
        console.error(error);
        throw new Error('Failed to hold the seats.');
      }
    },
    
    

    // Release a held seat
    releaseSeat: async (
      _: unknown,
      { holdSeatId, aircraftId }: { holdSeatId: string; aircraftId: string },
      context: Context,
      info: GraphQLResolveInfo
    ): Promise<boolean> => {
      const userId = context.user?.id; // Extract the userId from the authenticated context
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

        return true; // Successfully released the seat
      } catch (error) {
        console.error(error);
        throw new Error("Failed to release the seat.");
      }
    },
  },
};

export default checkSeatsResolver;
