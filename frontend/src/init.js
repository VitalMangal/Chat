import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18next from './i18next.js';
import AuthProvider from './context/AuthProvider.js';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'; 

import App from './App.js';
import { store } from './redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import './style.css'

const rollbarConfig = {
  accessToken: 'b104ab23ed4e4a769a155487b1854c29',
  environment: 'testenv',
}

export default () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(
    <React.StrictMode>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <Provider store={store}>
            <I18nextProvider i18n={i18next} defaultNS={'translation'}>
              <AuthProvider>
                <App />
              </AuthProvider>
            </I18nextProvider>
          </Provider>
        </ErrorBoundary>
      </RollbarProvider>
    </React.StrictMode>
  );
};

