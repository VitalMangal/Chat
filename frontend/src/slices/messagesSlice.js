import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  // Редьюсеры в слайсах меняют состояние и ничего не возвращают
  reducers: {
    addMessage: messagesAdapter.addOne,
    updateMessage: messagesAdapter.updateOne,
    removeMessage: messagesAdapter.removeOne,
    setMessages: messagesAdapter.setAll,
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
      const channelId = action.payload;
      const restMessages = Object.values(state.entities).filter((e) => e.channelId !== channelId);
      messagesAdapter.setAll(state, restMessages);
    });
  },
});

export const selectorsMessages = messagesAdapter.getSelectors((state) => state.messages);

export const { addMessage, updateMessage, removeMessage, setMessages } = messagesSlice.actions;

export default messagesSlice.reducer;