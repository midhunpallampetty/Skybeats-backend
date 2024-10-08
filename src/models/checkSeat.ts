import mongoose from 'mongoose';

// Define the schema for seat holding
const checkSeatSchema = new mongoose.Schema({
    holdSeatId: { 
        type: String, 
        required: true 
    },
    aircraftId: { 
        type: String, 
        required: true 
    },
    userId: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        index: { expires: '5m' } 
    }
});

// Create a composite unique index on holdSeatId and userId
checkSeatSchema.index({ holdSeatId: 1, userId: 1 }, { unique: true });

export const checkseatModel = mongoose.model('CheckSeat', checkSeatSchema);
