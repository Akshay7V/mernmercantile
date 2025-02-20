import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartPage = () => {
    const { cart } = useContext(CartContext);

    return (
        <div className="cart-page" style={{ textAlign: "center" }}> {/* ✅ Center text */}
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cart.map((item) => (
                    <div key={item.id} className="cart-item">
                        <h3>{item.name}</h3>
                        <p>Price: ₹{item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default CartPage;
