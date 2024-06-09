import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import i18next from 'i18next';
import * as filter from 'leo-profanity';
import { io } from 'socket.io-client';
import resources from './locales/index.js';
import AuthProvider from './context/AuthProvider.js';
import DataContext from './context/DataContext.js';

import App from './components/App.js';
import { store } from './redux';
import rollbarConfig from './utils/rollbarConfig.js';

export default async () => {
  const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';
  const socket = io(URL, {
    autoConnect: false,
  });

  filter.add(filter.getDictionary('ru'));

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

  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(
    <React.StrictMode>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <Provider store={store} filter={filter}>
            <I18nextProvider i18n={i18next} defaultNS="translation">
              <DataContext.Provider value={{ filter, socket }}>
                <AuthProvider>
                  <App />
                </AuthProvider>
              </DataContext.Provider>
            </I18nextProvider>
          </Provider>
        </ErrorBoundary>
      </RollbarProvider>
    </React.StrictMode>,
  );
};
