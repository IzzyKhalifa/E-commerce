import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../Login.css";

import LandingPage from "../pages/LandingPage.jsx";
import Products from "../pages/Products";
import Login from "../pages/LoginPage";
import Profile from "../pages/Profile";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "../utils/mutations";

export default function HomePage() {
  const [items, setItems] = useState([]);
  const [addOrder] = useMutation(ADD_ORDER);

  const handleAddToCart = async (productId) => {
    console.log(productId)
    const { data } = await addOrder({ variables: { addOrderProducts2:[productId] } });
    setItems((prevItems) => [...prevItems, data.addToCart]);
  };

  return (
    <Router>
      <div>
        <Header
          items={items}
          setItems={setItems}
          handleAddToCart={handleAddToCart}
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/products"
            element={<Products handleAddToCart={handleAddToCart} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
