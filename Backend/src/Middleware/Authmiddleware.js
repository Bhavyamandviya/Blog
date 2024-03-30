const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    const token =
      req.body.token ||
      req.cookies.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    console.log("token", token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    // token verfication
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decode", decode);
      req.user = decode;
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Dont know anything",
    });
  }
};
