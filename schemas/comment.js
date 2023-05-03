const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default:Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema);