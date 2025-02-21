const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const multer = require("multer");
const Admin = require("../models/Admin");

// Configure multer to store images in memory
const upload = multer({ storage: multer.memoryStorage() });

// Simple regex for validating email addresses
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Basic phone number validation: numeric only and length between 10 and 15 digits
const phoneRegex = /^\d{10,15}$/;

router.post("/register", upload.single("image"), async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Please provide a valid email address." });
    }

    // Validate phone number format
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: "Please provide a valid phone number (10-15 digits)." });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Process uploaded image (optional)
    let imageBuffer = null;
    if (req.file) {
      imageBuffer = req.file.buffer.toString("base64"); // Store as Base64 string (or save to cloud storage)
    }

    // Create a new Admin document
    const newAdmin = new Admin({
      name,
      email,
      phone,
      password: hashedPassword,
      image: imageBuffer, // Store the image if uploaded
    });

    // Save the new admin to the database
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully!" });
  } catch (error) {
    console.error("Error during admin registration:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

module.exports = router;
