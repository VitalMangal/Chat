import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../../routes.js';

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ 
    baseUrl: routes.usersPath(),
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (userData) => ({
        url: 'login',
        method: 'POST',
        body: userData,
      }),
    }),
    signUpUser: builder.mutation({
      query: (userData) => ({
        url: 'signup',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignUpUserMutation,
} = usersApi;