const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes"); // ✅ Import admin routes

const app = express();
const PORT = 5000;

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use("/api/admin", adminRoutes);

// ✅ Connect to MongoDB
(async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/productsDB");
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
})();

// ✅ Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
