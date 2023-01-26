import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

import Home from "./pages/Home";
import Login from "./pages/LoginPage";
// import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";


const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql ",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/profile/profile:id" element={<Profile />} /> */}
          </Routes>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}
