import express from "express";
import Cart from "../models/Cart.js"; // ✅ Import your Cart Model

const router = express.Router();

// ✅ Add product to cart
router.post("/", async (req, res) => {
    try {
        const { productId } = req.body;
        const cartItem = new Cart({ product: productId });
        await cartItem.save();
        res.status(201).json({ message: "Product added to cart" });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ error: "Failed to add to cart" });
    }
});

export default router;
