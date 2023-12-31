const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstname: {
      type: "String",
      required: true,
    },
    lastname: {
      type: "String",
      required: true,
    },
    username: {
      type: "String",
      required: true,
      unique: true,
    },
    password: {
      type: "String",
      required: true,
    },
    email: {
      type: "String",
      required: true,
      unique: true,
    },
    friends: [
      {
        friend: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        chat: {
          type: mongoose.Types.ObjectId,
          ref: "Chat",
        },
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
