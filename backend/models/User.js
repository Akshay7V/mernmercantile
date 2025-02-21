// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pnr: { type: String },
  email: { type: String, required: true, unique: true },
  year: { type: String },
  department: { type: String },
  password: { type: String, required: true },
  image: { type: String } // For storing the image filename or URL
});

module.exports = mongoose.model("User", userSchema);
