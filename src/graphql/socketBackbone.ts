import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
const app=express()
const server=http.createServer(app)
const backBoneServer=()=>{
    const io=new Server(server,{
        cors:{
            origin:'http://localhost:3000',
            methods:['GET','POST'],
            credentials:true,
        }
    
    })
    io.on('connection',(socket)=>{
        console.log('socket connected',socket.id);
        socket.on('sendMessage',(data)=>{
            console.log('message received',data);
            
            io.emit("broadcast",data)
            socket.on('disconnect',()=>{
    
                console.log('socket disconnected',socket.id);
                
        })
    })
    })


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
server.listen(2255,()=>{
    console.log('socket backbone server working at port 2255');
    
})
}
export default backBoneServer;