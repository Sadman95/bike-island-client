import React, { createContext, useReducer } from 'react';

// Create the Wishlist Context
export const WishlistContext = createContext();

// Initial state of the wishlist
const initialState = {
  items: [],
};

// Reducer function to manage wishlist actions
const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST': {
      const existingProduct = state.items.find((item) => item._id === action.payload._id);
      if (existingProduct) {
        return {
          ...state,
          items: state.items.map((item) =>
            item._id === action.payload._id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload._id),
      };
    default:
      return state;
  }
};

// WishlistProvider to wrap the app with the context
const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  return (
    <WishlistContext.Provider value={{ wishlist: state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
