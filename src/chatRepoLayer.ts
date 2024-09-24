const chatMessages = [];

const addChat = (chatData:any) => {
    chatMessages.push(chatData);
    console.log('Chat stored:', chatData);
};

export default { addChat };
