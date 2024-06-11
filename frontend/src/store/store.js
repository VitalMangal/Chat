import { configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import { channelsApi } from './channelsApi.js';
import { messagesApi } from './messagesApi.js';
import { usersApi } from './usersApi.js';

export const rtkQueryErrorLogger = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const rollbar = useRollbar();
    rollbar.error(`We got a rejected action: ${action}`);
    toast.error(`Ошибка ${action?.payload?.data?.error}`);
  }
  return next(action);
};

export const store = configureStore({
  reducer: {
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware)
    .concat(messagesApi.middleware)
    .concat(usersApi.middleware)
    .concat(rtkQueryErrorLogger),
});
