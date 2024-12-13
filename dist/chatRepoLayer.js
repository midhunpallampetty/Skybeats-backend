"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chatMessages = [];
const addChat = (chatData) => {
    chatMessages.push(chatData);
    console.log('Chat stored:', chatData);
};
exports.default = { addChat };
