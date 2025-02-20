import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import axios from "axios";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                setError("Failed to load product details.");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!product) return <p>Product not found.</p>;

    const handleAddToCart = () => {
        addToCart(product, 1);
        navigate("/cart");
    };

    const handleBuyNow = () => {
        alert("Order has been confirmed!"); // ✅ Show confirmation message
    
        // ✅ Get existing orders from local storage
        const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    
        // ✅ Add the new product to the orders array
        const updatedOrders = [...existingOrders, product];
    
        // ✅ Save updated orders back to local storage
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
    
        // ✅ Navigate to order page
        navigate("/order");
    };
    
    

    return (
        <div className="product-details" style={{ textAlign: "center" }}>
            <h2>{product.name}</h2>
            <img 
                src={product.image} 
                alt={product.name} 
                className="product-image" 
                onError={(e) => e.target.src = "/default-image.jpg"}
                style={{ width: "300px", height: "auto" }}
            />
            <p>{product.description}</p>
            <h3>₹{product.price}</h3>

            <button onClick={handleAddToCart} className="add-cart-btn">
                Add to Cart
            </button>
            <button onClick={handleBuyNow} className="buy-now-btn" style={{ marginLeft: "10px" }}>
                Buy Now
            </button>
        </div>
    );
};

export default ProductDetails;
