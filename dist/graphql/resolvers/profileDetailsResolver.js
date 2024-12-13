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
const profileDetailsModel_1 = require("../../models/profileDetailsModel");
const userModel_1 = require("../../models/userModel");
const profileDetailResolver = {
    Mutation: {
        addorUpdateProfile: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const input = args.input;
            try {
                console.log(input.userId, 'sds');
                const userId = input.userId;
                const user = yield profileDetailsModel_1.profiledetailModel.findOne({ userId });
                if (!user) {
                    console.log(user, 'user');
                    const data = input;
                    const addData = new profileDetailsModel_1.profiledetailModel(data);
                    const saveDB = addData.save();
                    return saveDB;
                }
                else {
                    const updateData = yield profileDetailsModel_1.profiledetailModel.findByIdAndUpdate(user._id, input, { new: true });
                    return updateData;
                }
            }
            catch (error) {
                console.log('error adding data');
            }
        })
    },
    Query: {
        getProfileDetails: (_, userId) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield profileDetailsModel_1.profiledetailModel.findOne(userId);
                return user;
            }
            catch (error) {
                console.log('cannot find user ');
            }
        }),
        getWalletDetails: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId }) {
            try {
                const user = yield userModel_1.UserModel.findOne({ _id: userId }, { walletBalance: 1, _id: 0 });
                if (!user) {
                    throw new Error("User not found");
                }
                return { walletBalance: user.walletBalance };
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(`Can't perform operation: ${error.message}`);
                    throw new Error("Error fetching wallet details");
                }
                else {
                    console.log("An unknown error occurred");
                    throw new Error("Error fetching wallet details");
                }
            }
        }),
    }
};
exports.default = profileDetailResolver;
