import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import userReducer from './userSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    user: userReducer,
  },
});