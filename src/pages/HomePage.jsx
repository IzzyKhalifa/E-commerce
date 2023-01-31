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
  const [itemsInCart, setItemsInCart] = useState([]);
  const [addOrder] = useMutation(ADD_ORDER);

  const handleAddToCart = async (productId) => {
    console.log(productId)
    setItems((prevItems) => [...prevItems, productId]);
    const { data } = await addOrder({ variables: { products:items } });
    console.log(data)
    setItemsInCart(data.addOrder.products)
  };

  return (
    <Router>
      <div>
        <Header
          items={items}
          setItems={setItems}
          handleAddToCart={handleAddToCart}
          itemsInCart={itemsInCart}
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
