import { Query } from "mongoose";
import { cargoModel } from "../../models/cargoModel";
import { cargoInput } from "../interfaces/cargoInput";
import util from 'util-functions-nodejs'

const cargoResolver = {
  Mutation: {
    requestCargo: async (_: {}, args: { input: cargoInput }) => {
      try {
        const trackingId = 'SKBTS' + util.generateOtp(8)
        console.log("Input received:", args.input);
        const data = new cargoModel({ ...args.input, approved: false, Date_Received: new Date(), trackingId: trackingId, rejected: false });
        const saveNew = await data.save();
        return saveNew;
      } catch (error) {
        console.error("Error adding data", error);
        throw new Error("Failed to add cargo booking");
      }
    },

    toggleApprovalStatus: async (_: {}, args: { trackingId: string }) => {
      try {
        // Destructure trackingId from args
        const { trackingId } = args;

        // Find the cargo record by trackingId
        const cargo = await cargoModel.findOne({ trackingId });

        if (!cargo) {
          throw new Error("Cargo not found");
        }

        // Toggle the 'approved' status
        cargo.approved = !cargo.approved;

        // Save the updated cargo record
        const updatedCargo = await cargo.save();

        return updatedCargo;
      } catch (error) {
        console.error("Error toggling approval status:", error);
        throw new Error("Failed to toggle approval status");
      }
    },

  },
  Query: {
    getRequests: async (_: {}) => {
      try {
        const cargoRequests = await cargoModel.find()
        return cargoRequests;
      } catch (error) {
        console.log(`can't find any request`)
      }
    },
    trackCargo: async (_:{},args: { trackingId: string }) => {
      console.log('idfrfdrd',args.trackingId)
      try {
        const { trackingId } = args;
        const details = await cargoModel.find({trackingId})
        return details;
      } catch (error) {
        console.log('canot find details')
      }
    }

  }
};
export default cargoResolver;