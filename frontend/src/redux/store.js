import { configureStore } from '@reduxjs/toolkit';
import { channelsApi } from './channelsApi.js';
import { messagesApi } from './messagesApi.js';
import userReducer from './userSlice.js';

export const store = configureStore({
  reducer: {
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(channelsApi.middleware).concat(messagesApi.middleware),
});