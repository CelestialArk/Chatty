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
      participants: [
        {
          participant: sender,
        },
        { participant: receiver },
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

const getChat = async (req, res) => {
  try {
    const { id } = req.body;
    const chat = await chatModel.findById(id);
    if (JSON.stringify(chat) === JSON.stringify([]))
      return res.status(200).json({ message: "No chats for now." });
    return res.status(200).json({ message: "Here is the chat :", chat: chat });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong while getting the chats : " + err.message,
    });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { id, receiver, content } = req.body;
    const token = req.cookies.access_token;
    const decoded = jwt.verify(token, process.env.SECRET);
    const chat = await chatModel.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          messages: {
            receiver: receiver,
            sender: decoded.id,
            content: content,
          },
        },
      }
    );
    return res.status(200).json({ message: "Messsage sent : ", chat: chat });
  } catch (err) {
    return res.status(400).json({
      message:
        "Something went wrong while trying to send a message : " + err.message,
    });
  }
};

module.exports = {
  addChat,
  getChat,
  sendMessage,
};
