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
// src/index.ts
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const connectDB_1 = __importDefault(require("./common/config/connectDB"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const typeDefs_1 = __importDefault(require("./graphql/typeDefs"));
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const socket_1 = require("./utils/socket");
const errorHandler_1 = __importDefault(require("../src/graphql/middlewares/errorHandler"));
const morgan_1 = __importDefault(require("morgan"));
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const httpServer = (0, http_1.createServer)(app);
    app.use((0, cors_1.default)());
    app.use((0, morgan_1.default)('dev'));
    (0, socket_1.configureSocket)(httpServer);
    yield (0, connectDB_1.default)();
    app.use(errorHandler_1.default);
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: typeDefs_1.default,
        resolvers: resolvers_1.default,
    });
    yield server.start();
    server.applyMiddleware({ app });
    httpServer.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    });
});
startServer();
