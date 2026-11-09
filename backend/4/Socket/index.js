import { Server } from "socket.io";
import app from "../app.js";
import {createServer} from 'http'
const server = createServer(app);
const io = new Server(server,{
    cors:'*'
});
const onlineUsers={}
const getOnlineUsers=(userIds)=>{
    const socketIds=[]
    userIds?.map((userId)=>{
        if(onlineUsers[userId.toString()]){
            socketIds.push(onlineUsers[userId.toString()])
        }
    })
    return socketIds
}


io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if(userId!=undefined){
        onlineUsers[userId] = socket.id;
    }
    io.emit("onlineUsers", Object.keys(onlineUsers));
    socket.on("disconnect", () => {
        delete onlineUsers[userId];
        io.emit("onlineUsers", Object.keys(onlineUsers));
    });
})
export {io,getOnlineUsers,server}