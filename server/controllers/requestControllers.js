const requestModel = require("../models/requestModel");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const sendRequest = async (req, res) => {
  try {
    const { receiverName } = req.body;
    const token = req.cookies.access_token;
    if (!token) return res.status(404).json({ message: "Not connected." });
    const decoded = jwt.verify(token, process.env.SECRET);
    const receiver = await userModel.findOne({ username: receiverName });
    if (!receiver)
      return res.status(200).json({ message: "No such user exists." });
    const request = await requestModel.create({
      receiver: receiver._id,
      sender: decoded.id,
    });
    receiver.updateOne({
      $push: {
        requests: {
          sender: decoded.id,
        },
      },
    });
    receiver.save();
    if (!request)
      return res.status(400).json({ message: "Request couldn't be sent." });
    return res
      .status(200)
      .json({ message: "Reqest sent successfully.", request: request });
  } catch (err) {
    return res.status(400).json({
      message:
        "Something went wrong while trying to send the request : " +
        err.message,
    });
  }
};

module.exports = {
  sendRequest,
};
