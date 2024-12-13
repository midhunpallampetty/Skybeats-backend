import { mealModel } from "../../models/mealModel"; 


export interface Meal {
    itemName: string;
    hotOrCold: string;
    ImageUrl: string;
    stock: number;
    price:number;
  }
  

const optionalFoodResolver = {
  Mutation: {
    addFoodItems: async (_: {}, args: { input: Meal }) => {
      try {
        const { itemName, hotOrCold, ImageUrl, stock,price } = args.input;
        
        
        const newMeal = new mealModel({
          itemName,
          hotOrCold,
          ImageUrl,
          stock,
          price
        });

        
        const savedMeal = await newMeal.save();
        console.log("Food item added successfully:", savedMeal);

        return savedMeal;
      } catch (error) {
        console.log('Operation not successful:', error);
        throw new Error("Failed to add food item.");
      }
    },
  
  },
  Query:{
    listFoods:async()=>{
      try{
        const listFoods=await mealModel.find()
        return listFoods;
      }catch(error){
        console.log('no food menu found')
      }
    }
  }
};

export default optionalFoodResolver;
