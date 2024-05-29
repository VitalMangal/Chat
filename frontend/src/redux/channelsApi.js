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
  //tagTypes: ['Channels'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
      //providesTags: ['Channels'],
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        method: 'POST',
        body: channel,
      }),
      //invalidatesTags: ['Channels'],
      async onQueryStarted(channel, { dispatch, queryFulfilled }) {
        try {
          const { data: newChannel } = await queryFulfilled
          const patchResult = dispatch(
            channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
              draftChannels.push(newChannel);
            }),
          )
        } catch {}
      },
    }),
    renameChannel: builder.mutation({
      query: ({id, body}) => ({
        url: id,
        method: 'PATCH',
        body,
      }),
      //invalidatesTags: ['Channels'],
      /*async onQueryStarted({id, body}, { dispatch, queryFulfilled }) {
        try {
          const { data: newChannel } = await queryFulfilled;
          const patchResult = dispatch(
          channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
            draftChannels.map((ch) => {
              if (ch.id === newChannel.id) {
                Object.assign(ch, newChannel)
              }
            })          
          }))     
        } catch {}
      },*/
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
      //invalidatesTags: ['Channels', 'Messages'],
     /* async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { id: removeId } = await queryFulfilled;
          const patchResult = dispatch(
          channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
            draftChannels.filter((ch) => ch.id !== removeId)          
          }))     
        } catch {}
      },*/
    }),
  }),
});

export const { 
  useGetChannelsQuery, 
  useAddChannelMutation, 
  useRenameChannelMutation, 
  useRemoveChannelMutation 
} = channelsApi;