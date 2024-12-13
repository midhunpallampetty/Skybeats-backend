"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const cloudImageTypedefs = (0, apollo_server_express_1.gql) `
type Cloud{
imageUrl:String
}
input CloudInput{
imageUrl:String
}
type Mutation{
SaveImage(input:CloudInput!):Cloud!
}
type Query{
GetCloudImages:[Cloud!]!
}

`;
exports.default = cloudImageTypedefs;
