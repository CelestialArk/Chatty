const express = require("express");
const {
  sendRequest,
  getRequests,
} = require("../controllers/requestControllers");

const route = express.Router();

route.post("/send", sendRequest);

route.get("/getAll", getRequests);

module.exports = route;
