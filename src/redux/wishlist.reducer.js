import { createSlice } from '@reduxjs/toolkit';

// Initial state of the wishlist
const initialState = {
  items: [],
};

// Create wishlist slice
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    // Add to wishlist action
    addToWishlist: (state, action) => {
      const existingProduct = state.items.find((item) => item._id === action.payload._id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    // Remove from wishlist action
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload._id);
    },
  },
});

// Export the actions and reducer
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
