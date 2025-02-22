import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from './globalConstants.ts';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store.ts';
import { BrowserRouter } from 'react-router-dom';
import { addInterceptor } from './axiosApi.ts';
import { ToastContainer } from 'react-toastify';

addInterceptor(store);

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <ToastContainer/>
          <App/>
        </BrowserRouter>
      </PersistGate>
    </Provider>,
  </GoogleOAuthProvider>
);
