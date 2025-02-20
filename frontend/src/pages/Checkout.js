import React from "react";
import { useLocation } from "react-router-dom";

const Checkout = () => {
    const location = useLocation();
    const { product, quantity } = location.state || {};

    if (!product) return <p>No product selected</p>;

    return (
        <div>
            <h2>Checkout</h2>
            <p>{product.name}</p>
            <p>Quantity: {quantity}</p>
            <p>Total Price: ${product.price * quantity}</p>
            <button>Proceed to Payment</button>
        </div>
    );
};

export default Checkout;
