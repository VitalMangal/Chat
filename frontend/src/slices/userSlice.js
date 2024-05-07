import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const userAdapter = createEntityAdapter();
const initialState = userAdapter.getInitialState();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: userAdapter.setAll,
    removeUser: userAdapter.removeAll,
  },
});

export const selectors = userAdapter.getSelectors((state) => state.user);

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;