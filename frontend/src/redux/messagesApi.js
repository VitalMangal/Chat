import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes.js';

export const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery({ 
    baseUrl: routes.messagesPath(),
    prepareHeaders: (headers) => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const { token } = userData;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }  
      return headers
    },
  }),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
      providesTags: ['Channels', 'Messages'],
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Messages'],
    }),
    editMessage: builder.mutation({
      query: (id, message) => ({
        url: id,
        method: 'PATCH',
        body: message,
      }),
      invalidatesTags: ['Messages'],
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useEditMessageMutation,
  useRemoveMessageMutation
} = messagesApi;