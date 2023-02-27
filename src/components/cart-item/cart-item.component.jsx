import {
  CartItemContainer,
  ItemDetailContainer,
  Name,
  Price,
} from "./cart-item.styles";

const CartItem = ({ cartItem }) => {
  const { imageUrl, price, name, quantity } = cartItem;

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetailContainer>
        <Name>{name}</Name>
        <Price>
          {quantity} x ${price}
        </Price>
      </ItemDetailContainer>
    </CartItemContainer>
  );
};

export default CartItem;
