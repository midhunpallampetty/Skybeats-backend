import {mergeTypeDefs } from '@graphql-tools/merge';
import userTypeDefs from './userTypeDefs';
import flightTypeDefs from './flightTypedefs';
import adminTypedefs from './adminTypedefs';
import hotelTypeDefs from './hotelTypeDefs';
import seatTypedefs from './seatTypedefs';
import hotelBookingTypedefs from './hotelBookingTypedefs';
import { gql } from 'apollo-server-express';
import cloudImageTypedefs from './cloudImageTypedefs';
import flightBookingTypedefs from './flightBookingTypedefs';
const typeDefs=mergeTypeDefs([userTypeDefs,cloudImageTypedefs,flightTypeDefs,hotelBookingTypedefs,adminTypedefs,hotelTypeDefs,seatTypedefs,flightBookingTypedefs])
export default typeDefs;