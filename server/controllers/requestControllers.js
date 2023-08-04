const chatModel = require("../models/chatModel");
const requestModel = require("../models/requestModel");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { addChat } = require("./chatControllers");

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
    const updated = await userModel.findOneAndUpdate(
      { _id: receiver._id },
      {
        $push: {
          requests: {
            request: request._id,
          },
        },
      }
    );
    if (!request)
      return res.status(400).json({ message: "Request couldn't be sent." });
    return res.status(200).json({
      message: "Request sent successfully.",
      request: request,
      updated: updated,
    });
  } catch (err) {
    return res.status(400).json({
      message:
        "Something went wrong while trying to send the request : " +
        err.message,
    });
  }
};

const replyRequest = async (req, res) => {
  try {
    const { id, reply } = req.body;
    if (reply) {
      const request = await requestModel.findOneAndDelete({ _id: id });
      const chat = addChat(request.sender, request.receiver);
      if (!chat)
        return res.status(400).json({ message: "Couldn't create the chat" });
      return res.status(200).json({ message: "Message created successfully" });
    }
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong while trying to reply : " + err.message,
    });
  }
};

const getRequests = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(404).json({ message: "not connected." });
  const decoded = jwt.verify(token, process.env.SECRET);
  const requests = await requestModel.findOne({ receiver: decoded.id });
  if (!requests)
    return res.status(200).json({
      message: "No requests for now",
    });
  return res
    .status(200)
    .json({ message: "Here are all the requests", requests: requests });
};

module.exports = {
  sendRequest,
  getRequests,
  replyRequest,
};
