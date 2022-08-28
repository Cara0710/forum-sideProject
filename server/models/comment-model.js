const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  id: { type: String },
  dangerous: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postSource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

module.exports = mongoose.model("Comment", commentSchema);
