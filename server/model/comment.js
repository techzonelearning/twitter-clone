import mongoose from "mongoose";

let commentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    tweet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tweet",
    },
  },
  {
    timestamps: true,
  }
);

let comment = mongoose.model("comment", commentSchema);
export default comment;
