import React, { useState } from "react";
import "./Register.css"; // Import the CSS file

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    pnr: "",
    email: "",
    year: "",
    department: "",
    password: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // To handle error messages

  // Handle text input change
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Show image preview
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    // Simple Validation
    if (!userData.name || !userData.email || !userData.password) {
      setError("Name, Email, and Password are required!");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("pnr", userData.pnr);
      formData.append("email", userData.email);
      formData.append("year", userData.year);
      formData.append("department", userData.department);
      formData.append("password", userData.password);
      if (image) {
        formData.append("image", image);
      }

      const response = await fetch("http://127.0.0.1:5000/api/auth/register", {
        method: "POST",
        body: formData, // Sending FormData
      });

      const data = await response.json();
      console.log("Response Data:", data);

      if (!response.ok) {
        throw new Error(data.error || "Registration failed!");
      }

      alert("✅ Registration Successful!");
      
      // Reset the form after success
      setUserData({
        name: "",
        pnr: "",
        email: "",
        year: "",
        department: "",
        password: "",
      });
      setImage(null);
      setPreview(null);

      window.location.href = "/login"; // Redirect to login
    } catch (error) {
      console.error("Error:", error.message);
      setError(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="input-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>PNR:</label>
            <input
              type="text"
              name="pnr"
              value={userData.pnr}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Year:</label>
            <input
              type="text"
              name="year"
              value={userData.year}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Department:</label>
            <input
              type="text"
              name="department"
              value={userData.department}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Image Upload Section */}
          <div className="input-group">
            <label>Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="image-preview">
              <p>Image Preview:</p>
              <img src={preview} alt="Preview" width="100" />
            </div>
          )}

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
