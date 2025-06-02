import mongoose from "mongoose";

let userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
    emailVerifyToken: {
      type: String,
    },
    emailVerifyTokenExpire: {
      type: String,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    location: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    tweets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tweet",
      },
    ],
    websiteUrl: {
      type: String,
      default: "",
    },
    bookMark: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tweet",
      },
    ],
  },
  {
    timestamps: true,
  }
);

let user = mongoose.model("user", userSchema);
export default user;
