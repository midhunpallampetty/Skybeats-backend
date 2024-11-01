import { gql } from "apollo-server-express";

const optionalFoodTypedefs = gql`
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

export default optionalFoodTypedefs;
