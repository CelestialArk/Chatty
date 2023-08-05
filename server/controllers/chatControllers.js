const chatModel = require("../models/chatModel");

const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const addChat = async (sender, receiver) => {
  try {
    const chat = await chatModel.create({
      messages: [
        {
          sender: sender,
          receiver: receiver,
          content: "You are now connected.",
        },
      ],
    });
    await userModel.findOneAndUpdate(
      { _id: sender },
      {
        $push: {
          chats: chat._id,
        },
      }
    );
    await userModel.findOneAndUpdate(
      { _id: receiver },
      {
        $push: {
          chats: chat._id,
        },
      }
    );
    if (!chat) return null;

    return chat;
  } catch (err) {
    return console.log(
      "Something went wrong while trying to add a chat : " + err.message
    );
  }
};

const getChats = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return res.status(404).json({ message: "Not logged in" });
    const decoded = jwt.verify(token, process.env.SECRET);
    const chats = await chatModel
      .find()
      .or(
        { messages: { sender: decoded.id } },
        { messages: { receiver: decoded.id } }
      );
    if (!chats) return res.status(200).json({ message: "No chats for now." });
    return res
      .status(200)
      .json({ message: "Here are all the chats :", chats: chats });
  } catch (err) {
    res.status(400).json({
      message:
        "Something went wrong while getting all the chats : " + err.message,
    });
  }
};

module.exports = {
  addChat,
  getChats,
};
