import AuthProvider from 'contexts/auth-provider';
import CartProvider from 'contexts/cart-provider';
import WishlistProvider from 'contexts/wishlist-provider';
const Providers = ({ children }) => (
  <AuthProvider>
    <CartProvider>
      <WishlistProvider>{children}</WishlistProvider>
    </CartProvider>
  </AuthProvider>
);

export default Providers;
