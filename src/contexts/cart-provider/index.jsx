import React, { createContext, useContext, useReducer } from 'react';

// Create the Cart Context
export const CartContext = createContext();

// Initial state of the cart
const initialState = {
  items: [],
};

// Reducer function to manage cart actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingProduct = state.items.find((item) => item._id === action.payload._id);
      if (existingProduct) {
        return {
          ...state,
          items: state.items.map((item) => item._id === action.payload._id ? { ...item, quantity: item.quantity + 1 } : item),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload._id),
      };
    default:
      return state;
  }
};

// CartProvider to wrap the app with the context
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cart: state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
