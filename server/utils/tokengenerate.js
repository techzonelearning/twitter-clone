import jwt from "jsonwebtoken";
function generateCookie(res, userId) {
  try {
    let token = jwt.sign({ userId }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      // httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "internal server error",
    });
  }
}

export default generateCookie;
