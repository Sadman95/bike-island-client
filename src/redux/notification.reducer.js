// src/redux/slices/notificationsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [], // List of notifications
  unreadCount: 0, // Count of unread notifications
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload); // Add to the beginning
      state.unreadCount += 1;
    },
    markAllAsRead: (state) => {
      state.unreadCount = 0;
      state.notifications = state.notifications.map((notif) => ({
        ...notif,
        read: true,
      }));
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },
});

export const { addNotification, markAllAsRead, clearNotifications } = notificationsSlice.actions;

export default notificationsSlice.reducer;
