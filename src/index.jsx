import React from 'react';
import 'index.css';
import { createRoot } from 'react-dom/client';

// third party
import { Provider } from 'react-redux';

// project imports
import App from './App';

// google-fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

// style + assets
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';
import { googleClientId } from './config/env';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);
const queryClient = new QueryClient();

// ==============================|| REACT DOM RENDER  ||============================== //

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={googleClientId}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          <Toaster />
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </PersistGate>
  </Provider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
reportWebVitals();
