import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

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
  setIsCartOpen: () => {},
  //My Implementation
  cartItems: [],
  isCartOpen: false,
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  incQuantity: () => {},
  decQuantity: () => {},
  cartCount: 0,
  totalPrice: 0,
});

const CART_ACTION_TYPE = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const INITIAL_STATE = {
  cartCount: 0,
  totalPrice: 0,
  cartItems: [],
  isCartOpen: false,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPE.SET_CART_ITEMS: {
      return {
        ...state,
        ...payload,
      };
    }
    case CART_ACTION_TYPE.SET_IS_CART_OPEN: {
      return {
        ...state,
        isCartOpen: payload,
      };
    }
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  // const [isCartOpen, setIsCartOpen] = useState(false);

  const [{ cartItems, isCartOpen, cartCount, totalPrice }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const newTotalPriceCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPE.SET_CART_ITEMS, {
        cartItems: newCartItems,
        totalPrice: newTotalPriceCount,
        cartCount: newCartCount,
      })
    );
  };

  const addItemToCart = (product) => {
    const newCartItems = addCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (product) => {
    const newCartItems = removeCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  const incQuantity = (product) => {
    const newCartItems = incItems(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  const decQuantity = (product) => {
    const newCartItems = decItems(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, bool));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartCount,
    totalPrice,
    // My Implementation
    removeItemFromCart,
    incQuantity,
    decQuantity,
    cartItems,
  };
  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};
