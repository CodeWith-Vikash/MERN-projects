const express = require("express");
const userModel = require("../models/userModel");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const { username, email, password, avatar } = req.body;

  try {
    const finduser = await userModel.findOne({ email });
    if (finduser) {
      return res
        .status(500)
        .json({ message: "an account with this email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new userModel({ username, email, password: hash, avatar });

    await user.save();
    const token = jwt.sign({ email }, process.env.SECRET);

    // Set the cookie without httpOnly so it can be accessed in frontend
    res.cookie("token", token, {
      secure: process.env.NODE_ENV === "production", // secure only in production (https)
      sameSite: "strict", // helps with CSRF
    });

    return res.status(200).json({ message: "User signup successful", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error while signing up", error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" }); // More generic message
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" }); // 401 for unauthorized
    }

    const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: "1h" }); // Add expiration to the token

    // Set the cookie without httpOnly so it can be accessed in frontend
    res.cookie("token", token, {
      secure: process.env.NODE_ENV === "production", // secure only in production (https)
      sameSite: "strict", // helps with CSRF
      maxAge: 60 * 60 * 1000, // Cookie expires in 1 hour
    });

    return res.status(200).json({ message: "User logged in successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error while logging in", error });
  }
});


module.exports = router;