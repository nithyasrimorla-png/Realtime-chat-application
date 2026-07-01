const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

let users = 0;

app.get("/", (req, res) => {
  res.send("Chat Server Running ");
});

io.on("connection", (socket) => {

  users++;
  io.emit("users_count", users);

  socket.on("send_message", (data) => {

    io.emit("receive_message", {
      user: data.user,
      message: data.message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    });

  });

  socket.on("typing", (name) => {
    socket.broadcast.emit("typing", name);
  });

  socket.on("disconnect", () => {
    users--;
    io.emit("users_count", users);
  });

});

server.listen(5000, () => {
  console.log(" Server running on port 5000");
});
