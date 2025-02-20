import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const admin = JSON.parse(localStorage.getItem("admin"));
            if (!admin || admin.role !== "admin") {
                alert("Access Denied! Admins only.");
                navigate("/"); // Redirect to home if not admin
            }
        } catch (error) {
            console.error("Error reading admin data:", error);
            navigate("/");
        }

        // Retrieve orders from local storage
        const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        setOrders(storedOrders);
    }, [navigate]);

    const removeOrder = (index) => {
        if (window.confirm("Are you sure you want to remove this order?")) {
            const updatedOrders = orders.filter((_, i) => i !== index);
            setOrders(updatedOrders);
            localStorage.setItem("orders", JSON.stringify(updatedOrders));
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={{ color: "green" }}>✅ Order Confirmed!</h2>

            {orders.length > 0 ? (
                orders.map((product, index) => (
                    <div key={index} style={styles.orderCard}>
                        <h3>{product.name}</h3>
                        <img src={product.image} alt={product.name} style={styles.image} />
                        <p>Price: ₹{product.price}</p>

                        <button 
                            onClick={() => removeOrder(index)} 
                            style={styles.removeButton}
                        >
                            Remove Order
                        </button>
                    </div>
                ))
            ) : (
                <p>No orders yet.</p>
            )}
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        marginTop: "20px",
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    },
    orderCard: {
        marginBottom: "20px",
        borderBottom: "2px solid #ddd",
        paddingBottom: "10px",
        backgroundColor: "#fff",
        padding: "10px",
        borderRadius: "8px",
    },
    image: {
        width: "150px",
        height: "150px",
        objectFit: "cover",
        borderRadius: "10px",
        marginBottom: "10px",
    },
    removeButton: {
        padding: "10px 20px",
        backgroundColor: "red",
        color: "white",
        border: "none",
        cursor: "pointer",
        fontSize: "14px",
        marginTop: "10px",
        borderRadius: "5px",
    }
};

export default OrderPage;
