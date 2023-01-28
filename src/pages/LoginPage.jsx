import React, { useState } from "react";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";

export default function LoginPage(props) {
  let [authMode, setAuthMode] = useState("signin");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };


  if (authMode === "signin") {
    return <Login changeAuthMode={changeAuthMode} />;
  }

  return <Signup changeAuthMode={changeAuthMode} />;
}
