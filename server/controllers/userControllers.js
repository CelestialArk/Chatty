const userModel = require("../models/userModel");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const chatModel = require("../models/chatModel");

const userSignup = (req, res) => {
  try {
    const { firstname, lastname, email, password, username } = req.body;
    if (!firstname || !lastname || !username || !email || !password) {
      return res.status(403).json({
        message: "Please provide all the necessary information.",
        state: false,
      });
    }
    bcrypt.hash(password, 10, async (err, hash) => {
      try {
        if (err) throw err;
        const user = await userModel.create({
          firstname,
          lastname,
          username,
          email,
          password: hash,
        });
        if (!user) {
          return res
            .status(400)
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
  } catch (err) {
    return res.status(400).json({
      message:
        "Something went wrong while trying to sinup the user : " + err.message,
      state: false,
    });
  }
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
    console.log(
      "Something went wrong while signing in the user : " + err.message
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
    const chats = await chatModel.find({
      "participants.participant": decoded.id,
    });
    if (JSON.stringify(chats) === JSON.stringify([]))
      return res.status(200).json({ message: "No user for now.", chats: null });
    return res
      .status(200)
      .json({ message: "Here are all the chats", chats: chats });
  } catch (err) {
    return res.status(400).json({
      message:
        "Something went wrong while getting all the users : " + err.message,
    });
  }
};

module.exports = {
  userSignup,
  userSignin,
  userCheck,
  userCheckout,
  getUsers,
};
