import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
  EmptyMessage,
} from "./checkout.styles";

import { useContext } from "react";
import { cartContext } from "../../context/cart.context";
import CheckoutItem from "../checkout-item/checkout-item.component";
const CheckOut = () => {
  const { totalPrice, cartItems } = useContext(cartContext);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>Price</HeaderBlock>
        <HeaderBlock>Remove</HeaderBlock>
      </CheckoutHeader>

      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))
      ) : (
        <EmptyMessage>Your cart is empty</EmptyMessage>
      )}
      <Total>Total: ${totalPrice}</Total>
    </CheckoutContainer>
  );
};

export default CheckOut;
