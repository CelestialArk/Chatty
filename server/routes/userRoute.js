const express = require("express");
const { userSignup } = require("../controllers/userControllers");

const route = express.Router();

route.post("/signup", userSignup);

module.exports = route;
