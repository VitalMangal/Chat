import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import i18next from 'i18next';
import Rollbar from 'rollbar';
import resources from './locales/index.js';
import AuthProvider from './context/AuthProvider.js';
import DataProvider from './context/DataProvider.js';

import App from './components/App.jsx';
import { store } from './store/index.js';
import rollbarConfig from './utils/rollbarConfig.js';

export default async () => {
  await i18next
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
      debug: true,
    });

  const rollbar = new Rollbar(rollbarConfig);

  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(
    <React.StrictMode>
      <RollbarProvider instance={rollbar}>
        <ErrorBoundary>
          <Provider store={store}>
            <I18nextProvider i18n={i18next} defaultNS="translation">
              <DataProvider>
                <AuthProvider>
                  <App />
                </AuthProvider>
              </DataProvider>
            </I18nextProvider>
          </Provider>
        </ErrorBoundary>
      </RollbarProvider>
    </React.StrictMode>,
  );
};
