const express = require("express");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const UserregModel = require("../models/registerModel");

const router = express.Router();

// Register user
router.post("/register", asyncHandler(async (req, res) => {
  const { email, password, facultyid } = req.body;

  if (!email || !password || !facultyid) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userExists = await UserregModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserregModel({ email, password: hashedPassword, facultyid });

  await newUser.save();
  res.status(201).json({ message: "User registered successfully", user: newUser });
}));

// Login user
router.post("/login", asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const user = await UserregModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      message: "Login successful",
      user: { email: user.email, facultyid: user.facultyid },
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
}));

module.exports = router;
