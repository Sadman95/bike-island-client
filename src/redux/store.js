// redux/store.js
import { appTitle } from 'config/env';
import { legacy_createStore as createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducer from './reducer';

const persistConfig = {
  key: appTitle,
  storage,
  blacklist: ['wishlist'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer);

export default store;
