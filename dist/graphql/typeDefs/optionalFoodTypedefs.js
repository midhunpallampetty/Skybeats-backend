"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const optionalFoodTypedefs = (0, apollo_server_express_1.gql) `
scalar Date
  type Food {
    itemName: String!      
    hotOrCold: String!    
    ImageUrl: String      
    stock: Float!  
    createdAt:Date       
    price:Float!
    id:ID
  }

  input FoodInput {
    itemName: String!      
    hotOrCold: String!     
    ImageUrl: String       
    stock: Float!  
    price:Float        
  }

  type Mutation {
    addFoodItems(input: FoodInput!): Food!  
    removeItem(id:ID):Food!
  }
    type Query{
    listFoods:[Food!]!
    }
`;
exports.default = optionalFoodTypedefs;
