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
const cargoModel_1 = require("../../models/cargoModel");
const util_functions_nodejs_1 = __importDefault(require("util-functions-nodejs"));
const cargoResolver = {
    Mutation: {
        requestCargo: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const trackingId = 'SKBTS' + util_functions_nodejs_1.default.generateOtp(8);
                console.log("Input received:", args.input);
                const data = new cargoModel_1.cargoModel(Object.assign(Object.assign({}, args.input), { approved: false, Date_Received: new Date(), trackingId: trackingId, rejected: false }));
                const saveNew = yield data.save();
                return saveNew;
            }
            catch (error) {
                console.error("Error adding data", error);
                throw new Error("Failed to add cargo booking");
            }
        }),
        toggleApprovalStatus: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { trackingId } = args;
                const cargo = yield cargoModel_1.cargoModel.findOne({ trackingId });
                if (!cargo) {
                    throw new Error("Cargo not found");
                }
                cargo.approved = !cargo.approved;
                const updatedCargo = yield cargo.save();
                return updatedCargo;
            }
            catch (error) {
                console.error("Error toggling approval status:", error);
                throw new Error("Failed to toggle approval status");
            }
        }),
    },
    Query: {
        getRequests: (_) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const cargoRequests = yield cargoModel_1.cargoModel.find();
                return cargoRequests;
            }
            catch (error) {
                console.log(`can't find any request`);
            }
        }),
        trackCargo: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('idfrfdrd', args.trackingId);
            try {
                const { trackingId } = args;
                const details = yield cargoModel_1.cargoModel.find({ trackingId });
                return details;
            }
            catch (error) {
                console.log('canot find details');
            }
        }),
        getCargoByUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(args.userId, 'dscdscd');
            try {
                const { userId } = args;
                const cargoDetails = yield cargoModel_1.cargoModel.find({ userId });
                return cargoDetails;
            }
            catch (error) {
                console.log('sorry, currently i am busy');
            }
        })
    }
};
exports.default = cargoResolver;
