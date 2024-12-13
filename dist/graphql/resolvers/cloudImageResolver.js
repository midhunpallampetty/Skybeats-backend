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
const cloudImageModel_1 = require("../../models/cloudImageModel");
const cloudImageResolver = {
    Mutation: {
        SaveImage: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { input } = args;
            const Image = new cloudImageModel_1.cloudImageModel(input);
            const saveImage = yield Image.save();
            return saveImage;
        })
    },
    Query: {
        GetCloudImages: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const Images = yield cloudImageModel_1.cloudImageModel.find();
                return Images;
            }
            catch (error) {
                console.log(`Can't Get Images From database`);
            }
        })
    },
};
exports.default = cloudImageResolver;
