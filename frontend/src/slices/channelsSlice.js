import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  // Редьюсеры в слайсах меняют состояние и ничего не возвращают
  reducers: {
    setChannels: channelsAdapter.setAll,
  },
});

export const selectorsChannels = channelsAdapter.getSelectors((state) => state.channels);

export const { setChannels } = channelsSlice.actions;

export default channelsSlice.reducer;