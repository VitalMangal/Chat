import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../../routes.js';

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ 
    baseUrl: routes.usersPath(),
  }),
  endpoints: (builder) => ({
    // const res = await axios.post(routes.loginPath(), values);
    // не додедлал, вопросы по удалению
    loginUser: builder.mutation({
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
  useRemoveMessageMutation
} = messagesApi;