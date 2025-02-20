import React, { useEffect, useState } from "react";
import OrderPage from "./OrderPage"; // Import OrderPage Component

const AdminProfile = () => {
    const [adminData, setAdminData] = useState({
        name: "Admin",
        role: "",
        image: "" // Add image field
    });

    useEffect(() => {
        const storedData = localStorage.getItem("adminData");
        if (storedData) {
            setAdminData(JSON.parse(storedData));
        }
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.sidebar}>
                {adminData.image && (
                    <img
                        src={adminData.image}
                        alt="Admin Profile"
                        style={styles.profileImage}
                    />
                )}
                <h3>{adminData.name}</h3>
                <p>{adminData.role === "admin" ? "Admin Panel" : "User Panel"}</p>
            </div>
            <div style={styles.content}>
                <h2>Welcome, {adminData.name}!</h2>
                <p>This is your admin dashboard.</p>

                {/* Show Order Page Only if Admin */}
                {adminData.role === "admin" && <OrderPage />}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        height: "100vh",
    },
    sidebar: {
        width: "250px",
        backgroundColor: "#282c34",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
    },
    profileImage: {
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        objectFit: "cover",
        marginBottom: "10px",
    },
    content: {
        flex: 1,
        padding: "20px",
    },
};

export default AdminProfile;
