import { mergeResolvers } from "@graphql-tools/merge";
import userResolver from "./userResolvers";
import flightResolvers from "./flightResolver";
import hotelResolvers from "./hotelResolver";
import adminResolver from "./adminResolver";
import seatResolvers from "./seatResolver";
import flightBookingResolver from "./flightBookingResolver";
const resolvers=mergeResolvers([userResolver,flightResolvers,adminResolver,hotelResolvers,seatResolvers,flightBookingResolver]);
export default resolvers;