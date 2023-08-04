const express = require("express");
const { addChat, getChats } = require("../controllers/chatControllers");

const route = express.Router();

route.post("/add", addChat);

route.get("/getAll", getChats);

module.exports = route;
