const express = require("express");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const router = express.Router();

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage });

// Registration Route
router.post("/register", upload.single("image"), async (req, res) => {
  try {
    const { name, pnr, email, year, department, password } = req.body;
    const image = req.file ? req.file.filename : ""; // Check if image is uploaded

    // Validate required fields
    if (!name || !pnr || !email || !year || !department || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Email validation (basic)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format!" });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin with this email already exists!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new Admin object
    const newAdmin = new Admin({
      name,
      pnr,
      email,
      year,
      department,
      password: hashedPassword,
      image,
    });

    // Save new Admin to the database
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully!" });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ error: "Server error!" });
  }
});

module.exports = router;
