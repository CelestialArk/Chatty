const requestModel = require("../models/requestModel");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { addChat } = require("./chatControllers");
const chatModel = require("../models/chatModel");

const sendRequest = async (req, res) => {
  try {
    const { username } = req.body;
    const token = req.cookies.chatty_token;
    if (!token) return res.status(404).json({ message: "Not connected." });
    const decoded = jwt.verify(token, process.env.SECRET);
    const receiver = await userModel.findOne({ username: username });
    if (!receiver)
      return res.status(200).json({ message: "No such user exists." });
    const chat = await chatModel
      .find({
        participants: {
          $elemMatch: {
            participant: decoded.id,
          },
        },
      })
      .and({
        participants: {
          $elemMatch: {
            participant: receiver._id,
          },
        },
      });
    if (JSON.stringify(chat) !== JSON.stringify([]))
      return res.status(200).json({ message: "User already a friend" });

    const request = await requestModel.create({
      receiver: receiver._id,
      sender: decoded.id,
    });
    if (!request)
      return res.status(400).json({ message: "Request couldn't be sent." });
    return res.status(200).json({
      message: "Request sent successfully.",
      request: request,
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
      const chat = await addChat(request.sender, request.receiver);
      await userModel.findOneAndUpdate(
        { _id: request.sender },
        {
          $push: {
            friends: {
              friend: request.receiver,
              chat: chat._id,
            },
          },
        }
      );
      await userModel.findOneAndUpdate(
        { _id: request.receiver },
        {
          $push: {
            friends: {
              friend: request.sender,
              chat: chat._id,
            },
          },
        }
      );
      if (!chat)
        return res.status(400).json({ message: "Couldn't create the chat" });
      return res.status(200).json({ message: "Chat created successfully" });
    }
    await requestModel.findOneAndDelete({ _id: id });
    return res.status(200).json({ message: "Reply to request: refused" });
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong while trying to reply : " + err.message,
    });
  }
};

const getRequests = async (req, res) => {
  const token = req.cookies.chatty_token;
  if (!token) return res.status(404).json({ message: "not connected." });
  const decoded = jwt.verify(token, process.env.SECRET);
  const requests = await requestModel
    .find({ receiver: decoded.id })
    .populate({ path: "sender", strictPopulate: false });
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
