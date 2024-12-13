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
const careerModel_1 = require("../../models/careerModel");
const careerResolver = {
    Mutation: {
        createJob: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const data = new careerModel_1.careerModel(args.input);
                const adding = data.save();
                return adding;
            }
            catch (error) {
                console.log('failed adding data');
            }
        })
    },
    Query: {
        getJobs: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const jobs = yield careerModel_1.careerModel.find();
                return jobs;
            }
            catch (error) {
                console.log(`can't fetch data from the database`);
            }
        })
    },
};
exports.default = careerResolver;
