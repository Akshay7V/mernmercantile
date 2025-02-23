const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pnr: { type: String },
  email: { type: String, required: true, unique: true },
  year: { type: String },
  department: { type: String },
  password: { type: String, required: true },
  image: { type: String } // For storing image filename, URL, or Base64 string
});

module.exports = mongoose.model("User", userSchema);
