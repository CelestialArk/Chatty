const userModel = require("../models/userModel");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const verifier = require("email-verify");
const { json } = require("express");

const userSignup = (req, res) => {
  let { firstname, lastname, email, password, username } = req.body;
  if (!firstname || !lastname || !username || !email || !password) {
    return res.status(200).json({
      message: "Please provide all the necessary informations.",
      state: false,
    });
  }
  if (username.length < 3 || username.length > 12) {
    return res.status(200).json({
      message:
        "Your username must have a number of characters between 3 and 12",
      state: false,
    });
  }
  if (password.length < 5) {
    return res.status(200).json({
      message: "Please provide a stronger password",
    });
  }

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) throw err;
    password = hash;
  });

  verifier.verify(email, async (err, info) => {
    if (err) throw err;
    if (!info.success) {
      return res
        .status(200)
        .json({ message: "Please provide a valid email address" });
    }

    try {
      if (err) throw err;
      const user = await userModel.create({
        firstname,
        lastname,
        username,
        email,
        password,
      });
      if (!user) {
        return res
          .status(200)
          .josn({ message: "User couldn't be created.", state: false });
      }

      const token = jwt.sign(
        { firstname, lastname, email, username, id: user._id },
        process.env.SECRET
      );

      return res.cookie("access_token", token).status(200).json({
        message: "User created successfully.",
        user: user,
        state: true,
      });
    } catch (err) {
      if (err.code == 11000) {
        if (err.keyPattern.username == 1)
          return res
            .status(200)
            .json({ message: "Username already exists", state: false });
        if (err.keyPattern.email == 1)
          return res
            .status(200)
            .json({ message: "Email already exists", state: false });
      }
    }
  });
};

const userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(200)
        .json({ message: "Please provide the necessary information." });
    const user = await userModel.findOne({ email: email });
    if (!user) return res.status(200).json({ message: "User doesn't exist." });
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) throw err;
      if (!result)
        return res.status(200).json({ message: "Password is incorrect." });
      const token = jwt.sign(
        {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          username: user.username,
          id: user._id,
        },
        process.env.SECRET
      );

      return res
        .cookie("access_token", token)
        .status(200)
        .json({ message: "Signed in successfully.", state: true });
    });
  } catch (err) {
    return (
      res.status(400),
      json({
        message:
          "Something went wrong while signing in the user : " + err.message,
      })
    );
  }
};

const userCheck = (req, res) => {
  try {
    if (!req.cookies.access_token)
      return res
        .status(200)
        .json({ message: "User not connected", state: false });
    const token = req.cookies.access_token;
    const decoded = jwt.verify(token, process.env.SECRET);
    return res.status(200).json({
      message: "User connected using cookies",
      decoded: decoded,
      state: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong while checking the user : " + err.message,
    });
  }
};

const userCheckout = async (req, res) => {
  try {
    if (req.cookies.access_token) {
      return res
        .clearCookie("access_token")
        .status(200)
        .json({ message: "Disconnected" });
    }
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong while checking out : " + err.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    if (!req.cookies.access_token)
      return res.status(404).json({ message: "Not connected." });
    const token = req.cookies.access_token;
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await userModel
      .findById(decoded.id)
      .populate({ path: "friends.friend", strictPopulate: false });
    return res.status(200).json({
      message: "Here are all the chats",
      users: user.friends,
    });
  } catch (err) {
    return res.status(400).json({
      message:
        "Something went wrong while getting all the users : " + err.message,
    });
  }
};

const searchUsers = async (req, res) => {
  const { username } = req.body;
  const users = await userModel
    .find({})
    .select("username -_id")
    .where({ username: username });
  return res
    .status(200)
    .json({ message: "Here are all the users :", users: users });
};

module.exports = {
  userSignup,
  userSignin,
  userCheck,
  userCheckout,
  getUsers,
  searchUsers,
};
