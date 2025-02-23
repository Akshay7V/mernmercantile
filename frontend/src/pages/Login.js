import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [pnr, setPnr] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",  // Include cookies/credentials
        body: JSON.stringify({ pnr, password }),
      });
      const data = await response.json();
      console.log("Response Data:", data);
      if (response.ok) {
        // Process successful login
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      console.error("Network Error:", err);
      setError("Network error. Try again later.");
    }
  };
  
  
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>PNR Number</label>
          <input
            type="text"
            placeholder="Enter PNR Number"
            value={pnr}
            onChange={(e) => setPnr(e.target.value.trim())}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-btn">Login</button>
      </form>

      <p className="signup-link">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
