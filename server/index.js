const express = require("express");

const cookieParser = require("cookie-parser");

const http = require("http");

const dotenv = require("dotenv").config();

const mongoose = require("mongoose");

const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const userRoute = require("./routes/userRoute");

const chatRoute = require("./routes/chatRoute");

const requestRoute = require("./routes/requestRoute");

const cors = require("cors");

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/api/user", userRoute);

app.use("/api/chat", chatRoute);

app.use("/api/request", requestRoute);

const io = new Server(server, {
  cors: {
    origin: "*",
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
