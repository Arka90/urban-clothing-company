import "./checkout.styles.scss";

import { useContext } from "react";
import { cartContext } from "../../context/cart.context";
import CheckoutItem from "../checkout-item/checkout-item.component";
const CheckOut = () => {
  const { totalPrice, cartItems } = useContext(cartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">Price</div>
        <div className="header-block">Remove</div>
      </div>

      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
      <span className="total">Total: ${totalPrice}</span>
    </div>
  );
};

export default CheckOut;
