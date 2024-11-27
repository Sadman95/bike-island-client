import { combineReducers } from 'redux';

// reducer import
import authReducer from './auth.reducer';
import customizationReducer from './customization.reducer';
import cartReducer from './cart.reducer';
import wishlistReducer from './wishlist.reducer';
import notificationsReducer from './notification.reducer'; 


// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  auth: authReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  notifications: notificationsReducer,
});

export default reducer;
