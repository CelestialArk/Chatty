const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const requestSchema = new Schema(
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
  },
  { timestamps: true }
);

const requestModel = mongoose.model("Request", requestSchema);

module.exports = requestModel;
