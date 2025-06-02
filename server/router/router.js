import express from "express";
import { body } from "express-validator";
import {
  checkAuthrization,
  emailVerification,
  followAndUnfollow,
  getUser,
  getUserById,
  login,
  logout,
  register,
  sugggestUser,
} from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import { likeAndDislike, postTweet } from "../controllers/tweet.controller.js";
import upload from "../utils/multer.js";
let route = express.Router();

let validation = [
  body("username").notEmpty().withMessage("please enter your username"),
  body("password")
    .notEmpty()
    .withMessage("please enter your password")
    .isStrongPassword()
    .withMessage("please enter a strong password")
    .isLength({ min: 6 })
    .withMessage("please enter a password with at least 6 characters"),
  body("email")
    .notEmpty()
    .withMessage("please enter your email")
    .normalizeEmail()
    .withMessage("please enter a valid email")
    .isEmail()
    .withMessage("please enter a valid email"),
];

route.post("/register", validation, register);
route.post("/login", login);
route.get("/logout", logout);
route.post("/emailVerification", emailVerification);
route.get("/checkAuthrization", auth, checkAuthrization);

route.get("/getUser", auth, getUser);
route.get("/getUserById/:id", auth, getUserById);
route.get("/sugggestUser", auth, sugggestUser);
route.get("/followAndUnfollow/:userYou", auth, followAndUnfollow);

route.post("/postTweet", auth, upload.single("tweetImage"), postTweet);
route.post("/likeAndDislike/:postId", auth, likeAndDislike);

export default route;
