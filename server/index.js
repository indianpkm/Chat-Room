import express from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import Connection from './db/conn.js';
import route from './route/route.js';

const PORT=process.env.PORT || 5000
const app=express()
app.use(cors())
Connection()

app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))


app.use('/',route)

const server=app.listen(PORT,()=>{
    console.log('server start ',PORT)
})

import { Server } from "socket.io";

const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000"
    }
})


const socketPort = io.httpServer.address().port;
console.log('Socket server started on port', socketPort);

let users=[]
const onlineUser=(userData,socketId)=>{
    !users.some(user=>user.sub==userData.sub) && users.push({...userData,socketId})
}

const getUser=(userId)=>{
    return users.find(user=>user.sub===userId)
}
io.on('connection',(socket)=>{
    console.log('User Connected')
    socket.on('addUser',userData=>{
        onlineUser(userData,socket.id)
        io.emit('getUsers',users)
    })
    socket.on('sendMessage',data=>{
        const user=getUser(data.receiverId)
        // console.log('user '+user.socketId)
        if(user){
            io.to(user.socketId).emit('getMessage',data)
        }
    })
    
    socket.on('sendMessage',data=>{
        const user=getUser(data.senderId)
        if(user){
            io.to(user.socketId).emit('getMessage',data)
        }
    })
    socket.on('disconnect', () => {
        // console.log('user disconnected')
        const disconnectedUser = users.find((user) => user.socketId === socket.id);
        if (disconnectedUser) {
          users = users.filter((user) => user.socketId !== socket.id);
        //   console.log('User Disconnected:', disconnectedUser);
          io.emit('getUsers', users);
        }
    });
})
