import express from 'express';
import punycode from 'punycode';
import { ApolloServer } from 'apollo-server-express';
import connectDB from './common/config/connectDB';
import { createServer } from 'http';
import { Server } from 'socket.io';
import chatRepoLayer from './chatRepoLayer'; 
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

import cors from 'cors';
import 'dotenv/config'
const startServer = async () => {
    const app: any = express();
    const httpServer=createServer(app)
    const io=new Server(httpServer,{
        cors:{
            origin:'http://localhost:3000',
            methods:['GET','POST'],
            credentials:true,
        }
    })
    app.use(cors());
   // handles socket.io connections
io.on('connection', (socket) => {
    console.log('User connected',socket.id)
   socket.on('joinRoom',({role,userId})=>{
    if(role==='user'){
      socket.join(`user-${userId}`)
    }else if(role==='admin'){
      socket.join('admin')
    }
   })
    // when a user sends a message, broadcast it to all other users
    socket.on('sendMesssage', (messageData) => {
      const {to,message}=messageData;
      console.log('message received',messageData);
      
     io.to(to).emit('receiveMessage',{message,from:socket.id}); 
     
    });
    socket.on('disconnect',()=>{
      console.log('a user disconnected',socket.id);
      
    });  // if a user disconnects, log it to the console
   
  });
    await connectDB()
    const server = new ApolloServer({
        typeDefs,
        resolvers,


    })
    await server.start()
    server.applyMiddleware({ app })

    
    httpServer.listen(process.env.PORT, () => {
        console.log('Server Started');

    })

}
startServer();