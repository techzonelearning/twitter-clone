import getFileURI from "../utils/fileURI.js";
import user from "../model/user.schema.js";
import tweet from "../model/tweet.js";
import cloudinary from "../utils/clodinary.js";

let postTweet = async (req, res) => {
  try {
    let userId = req.userId;
    let { tweetCaption } = req.body;
    let tweetImage = req.file;

    if (!userId || !tweetCaption) {
      return res.status(404).json({
        status: false,
        message: "required filed are missing",
      });
    }

    if (!tweetImage) {
      return res.status(404).json({
        status: false,
        message: "no file uploaded",
      });
    }

    let checkUser = await user.findById(userId);
    if (!checkUser) {
      return res.status(404).json({
        status: false,
        message: "user not found",
      });
    }

    let fileUri = getFileURI(tweetImage);
    let cloudResponse = await cloudinary.uploader.upload(fileUri, {
      folder: "post/Images",
    });

    let newTweet = await tweet.create({
      author: userId,
      tweetImage: cloudResponse.secure_url,
      tweetCaption,
    });

    if (checkUser) {
      await checkUser.tweets.push(newTweet._id);
      await checkUser.save();
    }

    if (!newTweet) {
      res.status(404).json({
        status: false,
        message: "something went wrong",
      });
    }

    res.status(200).json({
      status: true,
      message: "tweet post",
      newTweet,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "internal server error",
      err: error.message,
    });
  }
};

let likeAndDislike = async (req, res) => {
  try {
    let userId = req.userId;
    let { postId } = req.params;
    if (!userId || !postId) {
      return res.status(404).json({
        status: false,
        message: "userId not found",
      });
    }

    let checkUser = await user.findById(userId);
    if (!checkUser) {
      return res.status(404).json({
        status: false,
        message: "user not found",
      });
    }

    let checktweet = await tweet.findById(postId);
    if (!checktweet) {
      return res.status(404).json({
        status: false,
        message: "tweet not found",
      });
    }

    // like & dislike
    let isLike = await checktweet.likes.includes(userId);
    if (isLike) {
      // dislike
      await tweet.findByIdAndUpdate(postId, { $pull: { likes: userId } });
      await checkUser.save();
      return res.status(200).json({
        status: true,
        message: "post dislike",
      });
    } else {
      // like
      await tweet.findByIdAndUpdate(postId, { $push: { likes: userId } });
      await checkUser.save();

      return res.status(200).json({
        status: true,
        message: "post like",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "internal server error",
      err: error.message,
    });
  }
};

export { postTweet, likeAndDislike };
