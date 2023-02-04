import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
// import { loadStripe } from "@stripe/stripe-js";
import Box from "@mui/material/Box";
import { useMutation } from "@apollo/client";
import "../../style/ShoppingCart.css";
import { REMOVE_FROM_ORDER, CHECKOUT } from "../../utils/mutations";
import { useQuery } from "@apollo/client";
import { QUERY_ACTIVE_ORDER } from "../../utils/queries";

// const stripePromise = loadStripe('pk_test_51MXH42D7m7L3fey0bTsc1nD81lLOWit1KCCVm2BLNnpayuh9UaqMKSklvwa25nsGVJlprRUVbmmWlCxkkiItgFdq00NyjxDHiS');

function ShoppingCart({
  items,
  setItems,
  handleClose,
  itemsInCart,
  setItemsInCart,
}) {

  const { data, loading } = useQuery(QUERY_ACTIVE_ORDER);

  const [checkoutOrder] = useMutation(CHECKOUT);
  const [removeFromOrder] = useMutation(REMOVE_FROM_ORDER);
  const [orderID, setOrderID] = useState();

  const total = itemsInCart.reduce((acc, item) => acc + item.price, 0);

  useEffect(() => {
    if (data) {
      // console.log(data);
      setOrderID(data.orderActive._id);
      setItemsInCart(data.orderActive.products);
    }
  }, [data, loading, setItemsInCart]);


  const handleCheckout = async () => {
    const { data: checkoutData } = await checkoutOrder();
    alert(`Proceed to payment for order number ${checkoutData.checkout._id} with total: $${total}`)
    setItemsInCart([]);
    setItems([]);
  };


  const handleRemoveFromCart = async (productId) => {
    const { data: newData } = await removeFromOrder({
      variables: { orderId: orderID, productId },
    });

    setItemsInCart(newData.removeFromOrder.products);
    setItems(newData.removeFromOrder.products);
  };

  // console.log(itemsInCart);

  if (loading) {
    console.log("loading");
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

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
