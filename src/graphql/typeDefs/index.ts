import {mergeTypeDefs } from '@graphql-tools/merge';
import userTypeDefs from './userTypeDefs';
import flightTypeDefs from './flightTypedefs';
import adminTypedefs from './adminTypedefs';
import cargoTypedef from './cargoTypedef';
import hotelTypeDefs from './hotelTypeDefs';
import applyJobTypedefs from './applyJobTypedefs'
import checkSeatTypedefs from './checkSeatTypedefs';
import profileDetailstypedef from './profileDetailstypedefs';
import seatTypedefs from './seatTypedefs';
import hotelBookingTypedefs from './hotelBookingTypedefs';
import { gql } from 'apollo-server-express';
import returnFlightBTypedefs from './returnFlightTypedefs';
import cancelBookingTypedef from './cancelBookingTypedef';
import careerTypedefs from './careerTypedef';
import cloudImageTypedefs from './cloudImageTypedefs';
import flightDetailsTypeDef from './flightDetailtypedef';
import flightBookingTypedefs from './flightBookingTypedefs';
import googleLoginTypedefs from './googleLoginTypedefs';
import googleAuthSchema from './googleAuthSchema';
import transactionTypedefs from './transactiontypedefs';
import cancelHotelTypedef from './cancelHotelBookingtypedefs';
const typeDefs=mergeTypeDefs([userTypeDefs,googleAuthSchema,cancelHotelTypedef,transactionTypedefs,cancelBookingTypedef,googleLoginTypedefs,cloudImageTypedefs,returnFlightBTypedefs,profileDetailstypedef,flightDetailsTypeDef,checkSeatTypedefs,applyJobTypedefs,flightTypeDefs,cargoTypedef,hotelBookingTypedefs,careerTypedefs,adminTypedefs,hotelTypeDefs,seatTypedefs,flightBookingTypedefs])
export default typeDefs;