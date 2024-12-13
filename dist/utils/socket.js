"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureSocket = void 0;
// src/socket.ts
const socket_io_1 = require("socket.io");
let adminSocketId = null;
const configureSocket = (httpServer) => {
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });
    io.on('connection', (socket) => {
        console.log('User connected', socket.id);
        // Identify role
        socket.on('identify', (role) => {
            if (role === 'admin') {
                adminSocketId = socket.id;
                console.log('Admin connected with socket id', adminSocketId);
            }
            else {
                console.log('User connected with socket id', socket.id);
            }
        });
        // Handle private message from user to admin
        socket.on('privateMessageToAdmin', (message) => {
            if (adminSocketId) {
                console.log('Sending message to admin from user:', socket.id, new Date().toLocaleTimeString());
                io.to(adminSocketId).emit('privateMessageFromUser', {
                    message,
                    userId: socket.id,
                    time: new Date().toLocaleTimeString(),
                });
            }
            else {
                console.log('Admin not connected');
            }
        });
        // Handle private message from admin to user
        socket.on('privateMessageFromUser', ({ message, userId }) => {
            console.log(`Sending message to user ${userId} from admin`);
            io.to(userId).emit('privateMessageFromAdmin', { message });
        });
        // Handle disconnect
        socket.on('disconnect', () => {
            console.log('A user disconnected', socket.id);
            if (socket.id === adminSocketId) {
                adminSocketId = null;
                console.log('Admin has disconnected');
            }
        });
    });
};
exports.configureSocket = configureSocket;
