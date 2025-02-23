const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const multer = require("multer");
const User = require("../models/User");

// Configure multer to store images in memory (for file upload)
const upload = multer({ storage: multer.memoryStorage() });

router.post("/register", upload.single("image"), async (req, res) => {
  try {
    // Debug: Log the received body and file
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);

    // Destructure text fields from the request body
    const { name, pnr, email, year, department, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, Email, and Password are required!" });
    }

    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists!" });
    }

    // Hash the password using bcrypt with 10 salt rounds
    const hashedPassword = await bcrypt.hash(password, 10);

    // Process the uploaded image if available
    // Priority is given to the file upload (req.file) over any text value
    let processedImage = undefined;
    if (req.file) {
      processedImage = req.file.buffer.toString("base64");
    } else if (req.body.image) {
      processedImage = req.body.image;
    }

    // Create a new User document with the provided data
    const newUser = new User({
      name,
      pnr,
      email,
      year,
      department,
      password: hashedPassword,
      image: processedImage,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

module.exports = router;
