const express = require("express");

const cookieParser = require("cookie-parser");

const http = require("http");

const dotenv = require("dotenv").config();

const cors = require("cors");

const mongoose = require("mongoose");

const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const userRoute = require("./routes/userRoute");

const chatRoute = require("./routes/chatRoute");

const requestRoute = require("./routes/requestRoute");

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/api/user", userRoute);

app.use("/api/chat", chatRoute);

app.use("/api/request", requestRoute);

const io = new Server(server, {
  cors: {
    origin: process.env.origin,
    methods: ["GET", "POST"],
  },
});

let currentChat = 0;

io.on("connection", (socket) => {
  socket.on("joinChat", (chat) => {
    socket.join(chat);
    currentChat = chat;
  });

  socket.on("sendMessage", (state) => {
    socket.to(currentChat).emit("getMessage", currentChat);
  });

  socket.on("getRequests", (state) => {
    socket.broadcast.emit("gotRequest", true);
  });

  socket.on("Typing", (state) => {
    if (state) socket.to(currentChat).emit("Loading", true);
  });

  socket.on("replied", (state) => {
    socket.broadcast.emit("check", true);
  });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log("SERVER IS RUNNING");
    });
  })
  .catch((err) => {
    console.log("Something went wrong with the server : " + err.message);
  });
