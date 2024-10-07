import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-provider';

// Custom hook to use the Cart Context
export const useCart = () => useContext(CartContext);
