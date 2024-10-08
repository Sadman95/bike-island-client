import { useContext } from 'react';
import { WishlistContext } from '../../contexts/wishlist-provider';

// Custom hook to use the Wishlist Context
const useWishlist = () => useContext(WishlistContext);

export default useWishlist;
