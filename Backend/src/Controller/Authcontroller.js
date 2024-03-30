const bcrypt = require("bcrypt");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existinguser = await User.findOne({ email });

    if (existinguser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist with this email id",
      });
    }
    let hashpassword;
    try {
      hashpassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Error in hash password",
      });
    }

    const user = await User.create({
      name,
      email,
      password: hashpassword,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
    });
    return res.status(200).json({
      success: true,
      data: user,
      message: "User created Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User Registration failed please try again later",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Email or Password is missing",
      });
    }

    let user = await User.findOne({ email });
    // If user Doesnt exist
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user does not exist",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
    };

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      user = user.toObject();
      user.token = token;
      // for security purpose passing password as undefine not change in database
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        data: user,
        message: "Success",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Password doest not match",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Login Failed",
    });
  }
};
