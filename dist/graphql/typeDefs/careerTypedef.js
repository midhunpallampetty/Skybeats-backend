"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const careerTypedefs = (0, apollo_server_express_1.gql) `
type Job{
id:ID
designation:String!
description:String!
Image:String!
salary:Float
createdAt:String
}

input JobInput{
designation:String!
description:String!
Image:String!
salary:Float
}
type Mutation{
createJob(input:JobInput!):Job!
}
type Query{
getJobs:[Job!]!
}

`;
exports.default = careerTypedefs;
