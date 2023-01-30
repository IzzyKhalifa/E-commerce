import React from "react";
import { useMutation } from "@apollo/client";
import { CHECKOUT } from "../../utils/mutations";
import "../../style/ShoppingCart.css"

function ShoppingCart({items, setItems, handleClose}) {
  const [checkout] = useMutation(CHECKOUT);

  const handleCheckout = async (token) => {
    const { data } = await checkout({ variables: { token } });
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
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      <ul>
        {items.map((item) => (
          <li className="shopping-cart__item" key={item.id}>
            {item.name} - ${item.price}
            <button className="shopping-cart__remove-button" onClick={() => handleRemoveFromCart(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p className="shopping-cart__total">Total: ${total}</p>
      <button className="shopping-cart__checkout-button" onClick={handleCheckout}>Checkout</button>
      <button className="shopping-cart__checkout-button" onClick={handleClose}>Close</button>
    </div>
  );
}

export default ShoppingCart;
