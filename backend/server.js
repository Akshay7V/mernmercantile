// server.js
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const PORT = 5000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Mount admin routes under /api/admin
app.use("/api/admin", adminRoutes);

// Mount user (auth) routes under /api/auth
app.use("/api/auth", authRoutes);

// Mount product routes (if any)
app.use("/api/products", productRoutes);

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/productsDB")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
