import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import i18next from './utils/i18next.js';
import AuthProvider from './context/AuthProvider.js';

import App from './components/App.js';
import { store } from './redux';
import rollbarConfig from './utils/rollbarConfig.js';

export default () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(
    <React.StrictMode>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <Provider store={store}>
            <I18nextProvider i18n={i18next} defaultNS="translation">
              <AuthProvider>
                <App />
              </AuthProvider>
            </I18nextProvider>
          </Provider>
        </ErrorBoundary>
      </RollbarProvider>
    </React.StrictMode>,
  );
};
