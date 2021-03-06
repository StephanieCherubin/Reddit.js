const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require('./comment');

const PostSchema = new Schema({
  // createdAt: {
  //   type: Date
  // },
  // updatedAt: {
  //   type: Date
  // },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  subreddit: {
    type: String,
    required: true
  },
  comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  upVotes: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true
  }],
  downVotes: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true
  }],
  voteScore: {
      type: Number,
      default: 0
  }
});

// PostSchema.pre("save", function(next) {
//   // SET createdAt AND updatedAt
//   const now = new Date();
//   this.updatedAt = now;
//
//   if (!this.createdAt) {
//     this.createdAt = now;
//   }
//
//   next();
// });

module.exports = mongoose.model("Post", PostSchema);