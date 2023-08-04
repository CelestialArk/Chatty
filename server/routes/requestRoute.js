const express = require("express");
const { sendRequest } = require("../controllers/requestControllers");

const route = express.Router();

route.post("/send", sendRequest);

module.exports = route;
