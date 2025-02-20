const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  pnr: String,
  email: { type: String, unique: true },
  year: String,
  department: String,
  password: String,
  image: String // Add this field to store the image filename
});

module.exports = mongoose.model("User", userSchema);

