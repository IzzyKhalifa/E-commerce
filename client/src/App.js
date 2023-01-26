import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css"
import "./Login.css"

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/profile/profile:id" element={<Profile/>} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}
