const express = require("express");
const {
  addChat,
  getChat,
  sendMessage,
} = require("../controllers/chatControllers");

const route = express.Router();

route.post("/add", addChat);

route.post("/getChat", getChat);

route.post("/sendMessage", sendMessage);

module.exports = route;
