import React, { useState } from "react";
import ShoppingCart from "./ShoppingCart";
import { Modal , Box } from "@mui/material";
import "../../style/ShoppingCart.css"

function ShoppingCartModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button class="shoppingCartButton" onClick={handleOpen}>View Cart</button>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ><Box>
        <ShoppingCart handleClose={handleClose}/>
        </Box>
      </Modal>
    </>
  );
}

export default ShoppingCartModal;
