import { createSlice } from '@reduxjs/toolkit';
import { encrypt } from 'utils/encrypt';

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, id, ...rest } = action.payload;
      state.user = {
        token: encrypt(token),
        id: encrypt(id),
        ...rest,
      };
    },
    setProfileData: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    googleLoginSuccess: (state, action) => {
      const { token, ...rest } = action.payload;
      state.user = {
        email: rest.email,
        firstName: rest.given_name,
        lastName: rest.family_name,
        token: encrypt(token),
        avatar: rest.picture,
        isVerified: rest.email_verified,
      };
    },
    logout: (state) => {
      state.user = null;
    },
    updateInfo: (state, action) => {
      if (action.payload) {
        const { firstName, lastName, avatar, role } = action.payload;
        const data = {
          ...state.user,
          firstName,
          lastName,
          avatar,
          role,
        };
        state.user = data;
      } else {
        state.user = state.user ?? null;
      }
    },
    verifyUser: (state, action) => {
      const { isVerified } = action.payload;
      const data = {
        ...state.user,
        isVerified,
      };
      state.user = data;
    },
  },
});

export const { googleLoginSuccess, login, logout, updateInfo, verifyUser, setProfileData } =
  authSlice.actions;
export default authSlice.reducer;
