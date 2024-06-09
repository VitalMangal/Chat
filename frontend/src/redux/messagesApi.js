import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../utils/routes.js';

export const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.messagesPath(),
    prepareHeaders: (headers) => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const { token } = userData;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        method: 'POST',
        body: message,
      }),
    }),
    editMessage: builder.mutation({
      query: (id, message) => ({
        url: id,
        method: 'PATCH',
        body: message,
      }),
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useEditMessageMutation,
  useRemoveMessageMutation,
} = messagesApi;
