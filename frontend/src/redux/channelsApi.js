import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes';

export const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: fetchBaseQuery({ 
    baseUrl: routes.channelsPath(),
    prepareHeaders: (headers) => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const { token } = userData;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }  
      return headers
    },
  }),
  tagTypes: ['Channels'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
      providesTags: ['Channels'],
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: ['Channels'],
    }),
    renameChannel: builder.mutation({
      query: ({id, body}) => ({
        url: id,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Channels'],
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channels', 'Messages'],
    }),
  }),
});

export const { 
  useGetChannelsQuery, 
  useAddChannelMutation, 
  useRenameChannelMutation, 
  useRemoveChannelMutation 
} = channelsApi;