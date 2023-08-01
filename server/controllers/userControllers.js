const userModel = require("../models/userModel");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const userSignup = (req, res) => {
  try {
    const { firstname, lastname, email, password, username } = req.body;
    if (!firstname || !lastname || !username || !email || !password) {
      return res
        .status(403)
        .json({ message: "Please provide all the necessary information." });
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
          return res.status(400).josn({ message: "User couldn't be created." });
        }

        const token = jwt.sign(
          { firstname, lastname, email, username },
          process.env.SECRET
        );

        return res
          .cookie("access_token", token)
          .status(200)
          .json({ message: "User created successfully.", user: user });
      } catch (err) {
        if (err.code == 11000) {
          if (err.keyPattern.username == 1)
            return res.status(400).json({ message: "Username already exists" });
          if (err.keyPattern.email == 1)
            return res.status(400).json({ message: "Email already exists" });
        }
      }
    });
  } catch (err) {
    return res.status(400).json({
      message:
        "Something went wrong while trying to sinup the user : " + err.message,
    });
  }
};

const userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Please provide the necessary information." });
    const user = await userModel.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "User doesn't exist." });
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) throw err;
      if (!result)
        return res.status(403).json({ message: "Password is incorrect." });
      const token = jwt.sign(
        {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          username: user.username,
        },
        process.env.SECRET
      );

      return res
        .cookie("access_token", token)
        .status(200)
        .json({ message: "Signed in successfully." });
    });
  } catch (err) {
    console.log(
      "Something went wrong while signing in the user : " + err.message
    );
  }
};

const userCheck = () => {};

module.exports = {
  userSignup,
  userSignin,
};
