const express = require("express");
const { addChat } = require("../controllers/chatControllers");

const route = express.Router();

route.post("/add", addChat);

module.exports = route;
