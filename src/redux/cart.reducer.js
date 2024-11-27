import { createSlice } from '@reduxjs/toolkit';

// Initial state of the cart
const initialState = {
  token: '',
  items: [],
};

// Create cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add to cart action
    addToCart: (state, action) => {
      const { token, product } = action.payload;
      state.token = token;
      const existingProduct = state.items.find((item) => item._id === product._id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    // Remove from cart action
    removeFromCart: (state, action) => {
      const { token, product } = action.payload;
      state.token = token;
      const existingProduct = state.items.find((item) => item._id === product._id);
      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item._id !== product._id);
      }
    },
    // clear cart
    clearAllFromCart: (state) => {
      state.token = '';
      state.items = [];
    },
  },
});

// Export the actions and reducer
export const { addToCart, removeFromCart, clearAllFromCart } = cartSlice.actions;
export default cartSlice.reducer;
