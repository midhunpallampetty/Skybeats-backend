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
        
        const { trackingId } = args;

        
        const cargo = await cargoModel.findOne({ trackingId });

        if (!cargo) {
          throw new Error("Cargo not found");
        }

        
        cargo.approved = !cargo.approved;

      
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
    },
    getCargoByUser:async(_:{},args:{userId:string})=>{
      console.log(args.userId,'dscdscd')
      try{
      const {userId}=args;
      const cargoDetails=await cargoModel.find({userId})
      return cargoDetails;
      }catch(error){
      console.log('sorry, currently i am busy')
      }
    }

  }
};
export default cargoResolver;