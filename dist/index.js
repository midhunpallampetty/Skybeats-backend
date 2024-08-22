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
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const connectDB_1 = __importDefault(require("./common/config/connectDB"));
const userTypeDefs_1 = __importDefault(require("./graphql/typeDefs/userTypeDefs"));
const userResolvers_1 = __importDefault(require("./graphql/resolvers/userResolvers"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    yield (0, connectDB_1.default)();
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: userTypeDefs_1.default,
        resolvers: userResolvers_1.default,
    });
    yield server.start();
    server.applyMiddleware({ app });
    app.listen(3000, () => {
        console.log('Server Started');
    });
});
startServer();
