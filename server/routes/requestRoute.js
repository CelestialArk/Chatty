const express = require("express");
const {
  sendRequest,
  getRequests,
  replyRequest,
} = require("../controllers/requestControllers");

const route = express.Router();

route.post("/send", sendRequest);

route.get("/getAll", getRequests);

route.post("/reply", replyRequest);

module.exports = route;
