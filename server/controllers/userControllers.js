const userModel = require("../models/userModel");

const bcrypt = require("bcrypt");

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
        if (!user)
          return res.status(400).josn({ message: "User couldn't be created." });

        return res
          .status(200)
          .json({ message: "User created successfully.", user: user });
      } catch (err) {}
    });
  } catch (err) {
    return res.status(400).json({
      message:
        "Something went wrong while trying to sinup the user : " + err.message,
    });
  }
};

module.exports = {
  userSignup,
};
