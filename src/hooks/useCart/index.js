import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-provider';

// Custom hook to use the Cart Context
const useCart = () => useContext(CartContext);

export default useCart;
