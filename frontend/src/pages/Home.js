import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // ✅ Import Link for navigation
import "./Home.css";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/products");
                setProducts(res.data);
            } catch (err) {
                console.error("Error fetching products:", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="home">
            <h2>Our Products</h2>
            {loading ? (
                <p>Loading products...</p>
            ) : products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                <div className="product-list">
                    {products.map((product) => (
                        <div className="product-card" key={product._id}>
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <h4>₹{product.price}</h4>

                            {/* ✅ "View Details" Button */}
                            <Link to={`/product/${product._id}`}>
                                <button className="details-btn">View Details</button>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;
