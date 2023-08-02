const express = require("express");
const {
  userSignup,
  userSignin,
  userCheck,
  userCheckout,
} = require("../controllers/userControllers");

const route = express.Router();

route.post("/signup", userSignup);

route.post("/signin", userSignin);

route.get("/check", userCheck);

route.get("/checkout", userCheckout);

module.exports = route;
