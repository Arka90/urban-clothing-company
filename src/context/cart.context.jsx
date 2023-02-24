import { createContext, useState, useEffect } from "react";

export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// My Implementation
export const removeCartItem = (cartItems, productToRemove) => {
  const newCartItems = cartItems.filter(
    (item) => item.id !== productToRemove.id
  );

  return newCartItems;
};

export const incItems = (cartItems, productToInc) => {
  return cartItems.map((cartItem) =>
    cartItem.id === productToInc.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
  );
};

export const decItems = (cartItems, productToDec) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToDec.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== productToDec.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToDec.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const cartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  cartCount: 0,
  //My Implementation
  totalPrice: 0,
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  incQuantity: () => {},
  decQuantity: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newTotalPriceCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
    setTotalPrice(newTotalPriceCount);
  }, [cartItems]);

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  };

  const removeItemFromCart = (product) => {
    setCartItems(removeCartItem(cartItems, product));
  };

  const incQuantity = (product) => {
    setCartItems(incItems(cartItems, product));
  };

  const decQuantity = (product) => {
    setCartItems(decItems(cartItems, product));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    totalPrice,
    // My Implementation
    removeItemFromCart,
    incQuantity,
    decQuantity,
  };
  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};
