const express = require("express");
const { userSignup, userSignin } = require("../controllers/userControllers");

const route = express.Router();

route.post("/signup", userSignup);

route.post("/signin", userSignin);

module.exports = route;
