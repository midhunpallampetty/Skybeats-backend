"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const backBoneServer = () => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: 'https://www.skybeats.site/',
            methods: ['GET', 'POST'],
            credentials: true,
        }
    });
    io.on('connection', (socket) => {
        console.log('socket connected', socket.id);
        socket.on('sendMessage', (data) => {
            console.log('message received', data);
            io.emit("broadcast", data);
            socket.on('disconnect', () => {
                console.log('socket disconnected', socket.id);
            });
        });
    });
    app.get('/', (req, res) => {
        res.send(`
          <html>
            <head>
              <title>Welcome</title>
            </head>
            <body style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial, sans-serif;">
              <h1>Welcome to My Express & GraphQL Server!</h1>
            </body>
          </html>
        `);
    });
    server.listen(2255, () => {
        console.log('socket backbone server working at port 2255');
    });
};
exports.default = backBoneServer;
