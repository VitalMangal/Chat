import { configureStore, isRejectedWithValue, Middleware} from '@reduxjs/toolkit';
import {channelsApi} from './channelsApi.js';
import {messagesApi} from './messagesApi.js';
import {usersApi} from './usersApi.js';

import userReducer from './userSlice.js';
import { toast } from 'react-toastify';

// скорее всего отлов ошибок не получился
export const rtkQueryErrorLogger = () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      console.warn('We got a rejected action!')
      toast.error(`Ошибка ${action}`)
    }
    return next(action)
  }

export const store = configureStore({
  reducer: {
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(channelsApi.middleware).concat(messagesApi.middleware).concat(usersApi.middleware).concat(rtkQueryErrorLogger),
});

/*
import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
import { toast } from 'your-cool-library'

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.warn('We got a rejected action!')
      toast.warn({
        title: 'Async error!',
        message:
          'data' in action.error
            ? (action.error.data as { message: string }).message
            : action.error.message,
      })
    }

    return next(action)
    */