import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CHECKOUT } from "../../utils/mutations";
import "../../style/ShoppingCart.css";
import { REMOVE_FROM_ORDER } from "../../utils/mutations";
import { useQuery } from "@apollo/client";
import { QUERY_ACTIVE_ORDER } from "../../utils/queries";

function ShoppingCart({
  items,
  setItems,
  handleClose,
  itemsInCart,
  setItemsInCart,
}) {
  console.log(items);
  const [checkout] = useMutation(CHECKOUT);
  const [removeFromOrder] = useMutation(REMOVE_FROM_ORDER);
  const { data, loading } = useQuery(QUERY_ACTIVE_ORDER);

  const [orderID, setOrderID] = useState();

  useEffect(() => {
    if (data && !loading) {
      setOrderID(data.orderActive._id);
      setItemsInCart(data.orderActive.products);
    }
  }, [data, loading, setItemsInCart]);

  const handleCheckout = async (token) => {
    const { data } = await checkout({ variables: { token } });
    setItems([]);
    alert(
      `Charge complete! ID: ${data.checkout.id} Amount: ${data.checkout.amount} ${data.checkout.currency} Status: ${data.checkout.status}`
    );
  };

  if (loading) {
    return null;
  }

  const handleRemoveFromCart = async (productId) => {
    const { data: newData } = await removeFromOrder({
      variables: { orderId: orderID, productId },
    });

    setItemsInCart(newData.removeFromOrder.products);
    setItems(newData.removeFromOrder.products);
  };

  const total = itemsInCart.reduce((acc, item) => acc + item.price, 0);
  console.log(itemsInCart);
  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      <ul>
        {itemsInCart.map((item) => (
          <li className="shopping-cart__item" key={item._id}>
            {item.product_name} - ${item.price}
            <button
              className="shopping-cart__remove-button"
              onClick={() => handleRemoveFromCart(item._id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p className="shopping-cart__total">Total: ${total}</p>
      <button
        className="shopping-cart__checkout-button"
        onClick={handleCheckout}
      >
        Checkout
      </button>
      <button className="shopping-cart__checkout-button" onClick={handleClose}>
        Close
      </button>
    </div>
  );
}

export default ShoppingCart;
