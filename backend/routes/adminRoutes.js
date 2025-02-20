const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin"); // Make sure this path is correct

router.post("/register", async (req, res) => {
    try {
        const { name, email, phone, password, confirmPassword, image } = req.body;

        // Validation to check all required fields
        if (!name || !email || !phone || !password || !confirmPassword) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match!" });
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ error: "Admin already exists!" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new Admin document
        const newAdmin = new Admin({
            name,
            email,
            phone,
            password: hashedPassword,
            image,
        });

        // Save the new admin to the database
        await newAdmin.save();

        // Return success response
        res.status(201).json({ message: "Admin registered successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Export the router so it can be used in server.js
module.exports = router;
