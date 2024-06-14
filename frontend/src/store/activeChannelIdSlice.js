/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import defaultActiveChannelId from '../utils/defaultActiveChannelId';

const initialState = {
  value: defaultActiveChannelId,
};

const activeChannelIdSlice = createSlice({
  name: 'activeChannelId',
  initialState,
  reducers: {
    setActiveChannelId: (state, { payload }) => {
      state.value = payload;
    },
  },
});

export const { setActiveChannelId } = activeChannelIdSlice.actions;

export default activeChannelIdSlice.reducer;
