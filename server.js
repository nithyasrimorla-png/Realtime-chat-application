const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server,{
cors:{origin:"*"}
});

let users = 0;

io.on("connection",(socket)=>{

users++;
io.emit("users_count",users);

socket.on("send_message",(data)=>{
io.emit("receive_message",data);
});

socket.on("typing",(name)=>{
socket.broadcast.emit("typing",name);
});

socket.on("user_joined",(name)=>{
io.emit("user_joined",name);
});

socket.on("disconnect",()=>{
users--;
io.emit("users_count",users);
});

});
socket.on("typing", (name) => {
  socket.broadcast.emit("typing", name);
});
msg.addEventListener("input", () => {
socket.emit("typing", username.value);
});
socket.on("typing", (name) => {

typing.innerText = name + " is typing...";

setTimeout(() => {
typing.innerText = "";
}, 1500);

});
server.listen(5000,()=>{
console.log("Server running on port 5000");
});