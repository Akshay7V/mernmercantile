// models/Admin.js
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String } // This can store a filename or URL
});

module.exports = mongoose.model("Admin", adminSchema);
