import {
  CheckoutItemContainer,
  ImageContainer,
  Name,
  Quantity,
  Price,
  RemoveButton,
} from "./checkout-item.styles";

import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import {
  removeItemFromCart,
  incQuantity,
  decQuantity,
} from "../../store/cart/cart.action";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const handelDelete = () => {
    dispatch(removeItemFromCart(cartItems, cartItem));
  };

  const handelIncrease = () => {
    dispatch(incQuantity(cartItems, cartItem));
  };

  const handelDecrease = () => {
    dispatch(decQuantity(cartItems, cartItem));
  };

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <Name>{name}</Name>
      <Quantity>
        <div className="arrow" onClick={handelDecrease}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={handelIncrease}>
          &#10095;
        </div>
      </Quantity>
      <Price>{price}</Price>
      <RemoveButton onClick={handelDelete}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
