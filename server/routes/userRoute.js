const express = require("express");
const {
  userSignup,
  userSignin,
  userCheck,
  userCheckout,
  getUsers,
  searchUsers,
} = require("../controllers/userControllers");

const route = express.Router();

route.post("/signup", userSignup);

route.post("/signin", userSignin);

route.get("/check", userCheck);

route.get("/checkout", userCheckout);

route.get("/getAll", getUsers);

route.post("/search", searchUsers);

module.exports = route;
