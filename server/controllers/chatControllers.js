const chatModel = require("../models/chatModel");

const addChat = async (req, res) => {
  try {
    const { sender, receiver } = req.body;
    const chat = await chatModel.create({
      message: [{ sender: sender, receiver: receiver }],
    });
    if (!chat)
      return res.status(400).json({ message: "Couldn't create the chat." });

    return res.status(200).json({ message: "Chat created successfully." });
  } catch (err) {
    return res
      .status(400)
      .jons("Something went wrong while trying to add a chat : " + err.message);
  }
};

module.exports = {
  addChat,
};
