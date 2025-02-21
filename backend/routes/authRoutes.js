// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { name, pnr, email, year, department, password, image } = req.body;

    // Validate required fields for a user
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, Email, and Password are required!" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User document
    const newUser = new User({
      name,
      pnr,
      email,
      year,
      department,
      password: hashedPassword,
      image,
    });

    // Save new user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

module.exports = router;
