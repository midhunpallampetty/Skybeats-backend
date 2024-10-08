import express from 'express';
import punycode from 'punycode';
import { ApolloServer } from 'apollo-server-express';
import connectDB from './common/config/connectDB';
import { createServer } from 'http';
import { Server } from 'socket.io';
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
    let adminSocketid:any=null
io.on('connection', (socket) => {
    console.log('User connected',socket.id)
       socket.on('identify',(role)=>{
        if(role==='admin'){
            adminSocketid=socket.id;
            console.log('admin connected  with socket id',adminSocketid);
        }else{
            console.log('user connected with socket id',socket.id);
            
        }
         });

    socket.on('privateMessageToAdmin', (message) => {
    if(adminSocketid){
        console.log('Sending message to admin from user:', socket.id, new Date().toLocaleTimeString());

    io.to(adminSocketid).emit('privateMessageFromUser',{message,userId:socket.id,time:new Date().toLocaleTimeString()});
    }else{
        console.log('admin not connected');
        
    }
     
    });
    socket.on('privateMessageFromUser',({message,userId})=>{
        console.log(`Sending message to user ${userId} from admin`);
        io.to(userId).emit('privateMessageFromAdmin',{message});
    });
    socket.on('disconnect',()=>{
      console.log('a user disconnected',socket.id);
      if (socket.id === adminSocketid) {
        adminSocketid = null;  
        console.log('admin has disconnected');
        
      }
      
    });  
   
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
