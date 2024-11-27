import { createSelector } from 'reselect';

const selectUser = (state) => state.auth;
const selectCustomization = (state) => state.customization;
const selectCart = (state) => state.cart;
const selectWishist = (state) => state.wishlist;
const selectNotifications = (state) => state.notifications;

export const selectCurrentUser = createSelector([selectUser], (auth) => auth ? auth.user : null);
export const selectCurrentCart = createSelector([selectCart], (cart) => cart ? cart.items : []);
export const selectCurrentNotifications = createSelector([selectNotifications], (notifications) =>
  notifications,
);
export const selectCurrentWishlist = createSelector([selectWishist], (wishlist) =>
  wishlist ? wishlist.items : [],
);
export const selectCurrentMode = createSelector([selectCustomization], (data) => data);
