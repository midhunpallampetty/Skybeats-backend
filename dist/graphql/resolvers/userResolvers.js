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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../../models/userModel");
const util_functions_nodejs_1 = __importDefault(require("util-functions-nodejs"));
util_functions_nodejs_1.default.xKeyGenerator(100000000000);
const userResolver = {
    Mutation: {
        userSignup: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield userModel_1.UserModel.findByIdAndUpdate(args.id, {
                    username: args.productName,
                    email: args.category,
                    password: args.price,
                    //                    
                }, { new: true });
                console.log("updateProduct result:", result);
                return result;
            }
            catch (error) {
                console.log("Error in updateProduct:", error);
                throw new Error("Failed to update product");
            }
        }),
    }
};
exports.default = userResolver;
