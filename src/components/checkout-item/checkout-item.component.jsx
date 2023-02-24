import "./checkout-item.styles.scss";
import { useContext } from "react";
import { cartContext } from "../../context/cart.context";
const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { removeItemFromCart, incQuantity, decQuantity } =
    useContext(cartContext);

  const handelDelete = () => {
    removeItemFromCart(cartItem);
  };

  const handelIncrease = () => {
    incQuantity(cartItem);
  };

  const handelDecrease = () => {
    decQuantity(cartItem);
  };

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={handelDecrease}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={handelIncrease}>
          &#10095;
        </div>
      </span>
      <span className="quantity">{price}</span>
      <div className="remove-button" onClick={handelDelete}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
