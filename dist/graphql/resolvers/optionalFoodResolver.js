"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mealModel_1 = require("../../models/mealModel");
const optionalFoodResolver = {
    Mutation: {
        addFoodItems: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { itemName, hotOrCold, ImageUrl, stock, price } = args.input;
                const newMeal = new mealModel_1.mealModel({
                    itemName,
                    hotOrCold,
                    ImageUrl,
                    stock,
                    price
                });
                const savedMeal = yield newMeal.save();
                console.log("Food item added successfully:", savedMeal);
                return savedMeal;
            }
            catch (error) {
                console.log('Operation not successful:', error);
                throw new Error("Failed to add food item.");
            }
        }),
    },
    Query: {
        listFoods: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const listFoods = yield mealModel_1.mealModel.find();
                return listFoods;
            }
            catch (error) {
                console.log('no food menu found');
            }
        })
    }
};
exports.default = optionalFoodResolver;
