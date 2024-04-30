const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  friendId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const Friend = mongoose.model("friend", friendSchema);

module.exports = Friend;
