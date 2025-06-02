import mongoose from "mongoose";

let tweetSchema = mongoose.Schema(
  {
    tweetCaption: {
      type: String,
      required: true,
    },
    tweetImage: {
      type: String,
      default: "",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

let tweet = mongoose.model("tweet", tweetSchema);
export default tweet;
