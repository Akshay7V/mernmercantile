import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        image: null,
    });
    
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        console.log("Updated formData:", formData);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                setError("Only image files are allowed!");
                return;
            }

            if (file.size > 2 * 1024 * 1024) {
                setError("Image size should be less than 2MB!");
                return;
            }

            setFormData((prev) => ({ ...prev, image: file }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Prepare trimmed data for validation
        const trimmedFormData = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            password: formData.password,
        };

        // Check for empty fields
        for (const key in trimmedFormData) {
            if (!trimmedFormData[key]) {
                setError("All fields are required!");
                return;
            }
        }

        if (trimmedFormData.password.length < 6) {
            setError("Password must be at least 6 characters!");
            return;
        }

        setIsSubmitting(true);

        const formDataToSend = new FormData();
        formDataToSend.append("name", trimmedFormData.name);
        formDataToSend.append("email", trimmedFormData.email);
        formDataToSend.append("phone", trimmedFormData.phone);
        formDataToSend.append("password", trimmedFormData.password);
        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }

        try {
            const response = await fetch("http://localhost:5000/api/admin/register", {
                method: "POST",
                body: formDataToSend,
            });

            const data = await response.json();
            console.log("API Response:", data);

            if (!response.ok) {
                setError(data.error || "Something went wrong!");
                return;
            }

            setSuccess("Registration successful!");
            setTimeout(() => navigate("/admin/admin-login"), 2000);
        } catch (error) {
            setError("Error: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="admin-signup-container">
            <h2>Admin Signup</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <form onSubmit={handleSubmit} className="admin-signup-form">
                <label>Full Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label>Phone Number</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <label>Upload Image (Optional)</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="image-preview" />
                )}

                <button type="submit" className="signup-btn" disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Sign Up"}
                </button>
            </form>

            {/* Admin Login Redirect Button */}
            <div className="login-redirect">
                <p>Already have an admin account?</p>
                <button
                    type="button"
                    className="login-btn"
                    onClick={() => navigate("/admin/admin-login")}
                >
                    Admin Login
                </button>
            </div>
        </div>
    );
};

export default AdminSignup;
