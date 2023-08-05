const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userModel = require("./userModel");

const chatSchema = new Schema(
  {
    participants: [
      {
        participant: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: "User",
        },
      },
    ],

    messages: [
      {
        sender: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: "User",
        },
        receiver: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: "User",
        },
        content: {
          type: "String",
        },
      },
    ],
  },
  { timestamps: true }
);

const chatModel = mongoose.model("Chat", chatSchema);

module.exports = chatModel;
