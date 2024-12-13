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
const transactionModel_1 = require("../../models/transactionModel");
const transactionResolver = {
    Query: {
        ListTransactions: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { userId } = args;
                console.log(userId, 'Fetching transactions for this user ID');
                const transactions = yield transactionModel_1.transactionModel.find({ userId });
                console.log(transactions, 'Fetched transactions');
                return transactions;
            }
            catch (error) {
                console.error('Error fetching transactions:', error);
                throw new Error("Unable to fetch transactions for the specified user.");
            }
        })
    }
};
exports.default = transactionResolver;
