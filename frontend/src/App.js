import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterPage from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import AdminSignup from "./pages/AdminSignup";
import AdminLogin from "./pages/AdminLogin";


import AdminProfile from "./pages/AdminProfile";
import OrderPage from "./pages/OrderPage"; // ✅ Import OrderPage

function App() {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/admin/admin-login" element={<AdminLogin />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
