const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    participants: [
      {
        participant: { type: mongoose.Types.ObjectId, required: true },
      },
    ],

    messages: [
      {
        sender: {
          type: mongoose.Types.ObjectId,
          required: true,
        },
        receiver: {
          type: mongoose.Types.ObjectId,
          required: true,
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
