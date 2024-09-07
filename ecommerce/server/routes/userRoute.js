const express = require("express");
const userModel = require("../models/userModel");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const { username, email, password, avatar } = req.body;
  
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new userModel({ username, email, password: hash, avatar });
    
    await user.save();
    const token = jwt.sign({ email }, process.env.SECRET);
    
    // Set the cookie without httpOnly so it can be accessed in frontend
    res.cookie("token", token, {
      secure: process.env.NODE_ENV === "production",  // secure only in production (https)
      sameSite: "strict",  // helps with CSRF
    });

    res.status(200).json({ message: "User signup successful", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error while signing up", error });
  }
});

module.exports = router;
