const express = require("express");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const Admin = require("../models/Admin");

const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({
    destination: "uploads/", // Store images in an uploads folder
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage });

// Admin Registration Route
router.post("/register", upload.single("image"), async (req, res) => {
    console.log("Received Data:", req.body); // Debugging log
    try {
        const { name, email, phone, password, confirmPassword } = req.body;
        const image = req.file ? req.file.filename : ""; // Save uploaded image filename

        // Validate required fields
        if (!name || !email || !phone || !password || !confirmPassword) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        // Password confirmation check
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match!" });
        }

        // Check if email already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ error: "Email already exists!" });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save new Admin
        const newAdmin = new Admin({
            name,
            email,
            phone,
            password: hashedPassword,
            image
        });

        await newAdmin.save();

        res.status(201).json({ 
            message: "Admin registered successfully!",
            admin: { name, email, phone, image } // Exclude password from response
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error!" });
    }
});

module.exports = router;
