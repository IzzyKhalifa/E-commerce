import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_TO_CART, CHECKOUT } from "../../utils/mutations";

function ShoppingCart() {
  const [items, setItems] = useState([]);
  const [addToCart] = useMutation(ADD_TO_CART);
  const [checkout] = useMutation(CHECKOUT);

  const handleAddToCart = async (productId) => {
    const { data } = await addToCart({ variables: { productId } });
    setItems((prevItems) => [...prevItems, data.addToCart]);
  };

  const handleCheckout = async (token) => {
    const { data } = await checkout({ variables: { token } });
    // Clear the cart and show the charge information
    setItems([]);
    alert(
      `Charge complete! ID: ${data.checkout.id} Amount: ${data.checkout.amount} ${data.checkout.currency} Status: ${data.checkout.status}`
    );
  };

  const handleRemoveFromCart = (productId) => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== productId));
  };

  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => handleRemoveFromCart(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p>Total: ${total}</p>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default ShoppingCart;
