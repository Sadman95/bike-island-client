import React from 'react';
import AuthProvider from '../contexts/auth-provider';
import CartProvider from '../contexts/cart-provider';

const Providers = ({ children }) => (
  <AuthProvider>
    <CartProvider>{children}</CartProvider>
  </AuthProvider>
);

export default Providers;
