const express = require("express");

const cookieParser = require("cookie-parser");

const http = require("http");

const { Server } = require("socket.io");

const dotenv = require("dotenv").config();

const cors = require("cors");

const mongoose = require("mongoose");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.origin,
    methods: ["GET", "POST"],
  },
});

const userRoute = require("./routes/userRoute");

const chatRoute = require("./routes/chatRoute");

const requestRoute = require("./routes/requestRoute");

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/api/user", userRoute);

app.use("/api/chat", chatRoute);

app.use("/api/request", requestRoute);

io.on("connection", (socket) => {
  socket.on("getChat", (data) => {
    socket.join(data);
    socket.emit("gotChat", "Here is the chat : " + data);
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
