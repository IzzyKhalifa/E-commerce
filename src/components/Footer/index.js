import React from "react";
// Import hooks from React Router

import { Paper } from "@mui/material";

const Footer = () => {
  
  return (
    <Paper
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0
      }}
      component="footer"
      square
      variant="outlined"
    >
      <footer className="w-100 mt-auto text-dark p-4">
        <div className="container text-center mb-5">
          <h4>&copy; {new Date().getFullYear()} - E-Designs</h4>
        </div>
      </footer>
    </Paper>
  );
};

export default Footer;
