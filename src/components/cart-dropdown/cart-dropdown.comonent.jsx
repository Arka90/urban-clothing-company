import "./cart-dropdown.styles.scss";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../../context/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
const CartDropdown = () => {
  const { cartItems, setIsCartOpen } = useContext(cartContext);
  const navigate = useNavigate();
  const checkoutHandler = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <Button onClick={checkoutHandler}>Go to Checkout</Button>
    </div>
  );
};

export default CartDropdown;
