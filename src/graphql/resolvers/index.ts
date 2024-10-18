import { mergeResolvers } from "@graphql-tools/merge";
import userResolver from "./userResolvers";
import flightResolvers from "./flightResolver";
import checkSeatsResolver from "./checkSeatResolver";
import hotelResolvers from "./hotelResolver";
import cargoResolver from "./cargoResolver";
import applyJobResolver from './applyJobResolver'
import adminResolver from "./adminResolver";
import seatResolvers from "./seatResolver";
import careerResolver from "./careerResolver";
import hotelBookingResolver from "./hotelBookingResolver";
import cloudImageResolver from "./cloudImageResolver";
import returnFlightResolver from "./returnFlightResolver";
import flightBookingResolver from "./flightBookingResolver";
import profileDetailResolver from "./profileDetailsResolver";
import flightDetailsResolver from "./flightDetailsResolver";

const resolvers=mergeResolvers([userResolver,cloudImageResolver,returnFlightResolver,profileDetailResolver,flightDetailsResolver,checkSeatsResolver,applyJobResolver,cargoResolver,flightResolvers,careerResolver,adminResolver,hotelResolvers,hotelBookingResolver,seatResolvers,flightBookingResolver]);
export default resolvers;