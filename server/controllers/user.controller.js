import bcrypt from "bcryptjs";
import user from "../model/user.schema.js";
import { validationResult } from "express-validator";
import generateCookie from "../utils/tokengenerate.js";
import {
  sendEmailVerification,
  sendEmailWelcome,
} from "../email/emailsender.js";

let register = async (req, res) => {
  let { username, email, password } = req.body;
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ status: false, error: error.array() });
    }
    let findUser = await user.findOne({ $or: [{ email }, { username }] });
    if (findUser) {
      return res.status(400).json({ status: false, error: "user already exists" });
    }
    // hash password
    let hashedPassword = await bcrypt.hash(password, 12);
    let emailVerifyToken = Math.floor(
      Math.random() * 900000 + 100000
    ).toString();

    // token expiry
    let emailVerifyTokenExpire = Date.now() + 1000 * 60 * 60 * 15;

    // user create in database
    let newUser = new user({
      username,
      email,
      password: hashedPassword,
      emailVerifyToken,
      emailVerifyTokenExpire,
      isVerify: false,
    });
    let saveUser = await newUser.save();

    // token generate
    generateCookie(res, saveUser._id);

    // sendEmail
    await sendEmailVerification(email, emailVerifyToken);

    res.status(201).json({
      status: true,
      message: `${saveUser.username} register`,
      user: saveUser,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "internal server error",
    });
  }
};

let login = async (req, res) => {
  let { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "required field are missing",
      });
    }

    // check user in database
    let findUser = await user.findOne({ email });
    if (!findUser) {
      return res.status(400).json({
        status: false,
        message: "user not found",
      });
    }

    // check password
    let checkPassword = await bcrypt.compare(password, findUser.password);
    if (!checkPassword) {
      return res.status(400).json({
        status: false,
        message: "Invalid credetails",
      });
    }
    // token generate
    generateCookie(res, findUser._id);

    res.status(200).json({
      status: true,
      message: {
        ...findUser._doc,
        password: "*********",
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "internal server error",
    });
  }
};

let logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      status: true,
      message: "logout successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "internal server error",
    });
  }
};

let emailVerification = async (req, res) => {
  try {
    let { token } = req.body;
    if (!token) {
      return res.status(404).json({
        status: false,
        message: "please enter your correct otp",
      });
    }

    let verifyToken = await user.findOne({
      emailVerifyToken: token,
      emailVerifyTokenExpire: { $gt: Date.now() },
    });

    if (!verifyToken) {
      return res.status(400).json({
        status: false,
        message: "your otp has expire or invalid",
      });
    }

    verifyToken.isVerify = true;
    verifyToken.emailVerifyTokenExpire = null;
    await verifyToken.save();

    await sendEmailWelcome(verifyToken.email, verifyToken.username);
    // send email verification

    res.status(200).json({
      status: true,
      message: "Thanks for verification",
      verifyToken: {
        ...verifyToken._doc,
        password: "**********",
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "interal server error",
    });
  }
};

let checkAuthrization = async (req, res) => {
  try {
    let userId = req.userId;
    if (!userId) {
      return res.status(400).json({
        status: false,
        message: "userId not found",
      });
    }

    let checkUser = await user.findById(userId);
    if (!checkUser) {
      return res.status(400).json({
        status: false,
        message: "user not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Thanks for verification",
      checkUser: {
        ...checkUser._doc,
        password: "**********",
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "internal server error",
    });
  }
};

// get user
let getUser = async (req, res) => {
  try {
    let userId = req.userId;
    if (!userId) {
      return res.status(404).json({
        status: false,
        message: "user id not found",
      });
    }

    // finduser
    let findUser = await user.findById(userId).select("-password")
    .populate({ path: "tweets", options: { sort: { createdAt: -1 } } });

    if (!findUser) {
      return res.status(404).json({
        status: false,
        message: "user not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "user find successfully",
      findUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      status: false,
      err: error.message,
    });
  }
};

// get specific user
let getUserById = async (req, res) => {
  try {
    let { id } = req.params;
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "user id is required",
      });
    }
    // find user
    let findUser = await user.findById(id).select("-password");

    if (!findUser) {
      return res.status(404).json({
        status: false,
        message: "user not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "user found successfully",
      findUser,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "internal server error",
      err: error.message,
    });
  }
};

// suggested user
let sugggestUser = async (req, res) => {
  try {
    let userId = req.userId;
    if (!userId) {
      return res.status(404).json({
        status: false,
        message: "user id not found",
      });
    }
    // suggetUser
    let suggetUser = await user
      .find({ _id: { $ne: userId } })
      .select("username profilePicture name bio");
    if (suggetUser.length > 0) {
      res.status(200).json({
        status: true,
        message: "get suggested User",
        suggetUser,
      });
    } else {
      res.status(404).json({
        status: false,
        message: "no suggested user",
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

// follow & unfollow
let followAndUnfollow = async (req, res) => {
  try {
    let userMe = req.userId;
    let { userYou } = req.params;
    if (!userMe || !userYou) {
      return res.status(404).json({
        status: false,
        message: "user id not found",
      });
    }

    // check user in database
    let [me, you] = await Promise.all([
      user.findById(userMe),
      user.findById(userYou),
    ]);

    if (!me || !you) {
      return res.status(404).json({
        status: false,
        message: "user not found",
      });
    }

    // check user follow & unfollow

    const isFollowing = me.following.includes(userYou);

    await Promise.all([
      user.updateOne(
        { _id: userMe },
        { [isFollowing ? "$pull" : "$push"]: { following: userYou } }
      ),
      user.updateOne(
        { _id: userYou },
        { [isFollowing ? "$pull" : "$push"]: { followers: userMe } }
      ),
    ]);

    return res.status(200).json({
      status: true,
      message: isFollowing
        ? "User unfollowed successfully"
        : "User followed successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "internal server erorr",
      err: error.message,
    });
  }
};

export {
  getUser,
  register,
  login,
  logout,
  emailVerification,
  checkAuthrization,
  getUserById,
  sugggestUser,
  followAndUnfollow,
};
