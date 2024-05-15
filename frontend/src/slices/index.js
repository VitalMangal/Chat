import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import userReducer from './userSlice.js';
import messagesReducer from './messagesSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    user: userReducer,
  },
});