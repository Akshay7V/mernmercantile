import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import "./Navbar.css"; 

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    setIsAdmin(!!admin); // ✅ Check if an admin is logged in
  }, []);

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {isAdmin && <li><Link to="/orders">Orders</Link></li>} {/* ✅ Only for Admin */}
      </ul>

      <div className="right-section">
        <Link to="/cart" className="cart-icon">
          <FaShoppingCart size={28} />
        </Link>

        <div 
          className="profile-container"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <FaUserCircle size={28} className="profile-icon" />
          
          {showDropdown && (
            <div className="dropdown-menu">
              <Link to="/profile" className="dropdown-item">My Profile</Link>
              <Link to="/login" className="dropdown-item">Login/Register (std)</Link>
              <Link to="/admin-signup" className="dropdown-item">Login/Register (admin)</Link>
              <Link to="/admin-profile" className="dropdown-item">Admin Profile</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
