import React, {useEffect, useRef, useState, useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { io } from "socket.io-client";

import ChannelsComponent from './ChannelsComponent.js';
import MessagesComponent from './MessagesComponent.js';

import {channelsApi} from '../../redux';
import {messagesApi} from '../../redux';

import { useGetChannelsQuery, useGetMessagesQuery, useAddMessageMutation, } from '../../redux/index.js'
  const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';
  // const socket = io(URL);
const socket = io(URL, {
  autoConnect: false
});
const defaultActiveChannelId = '1';

const MainPage = () => {
  const [activeChannelId, setActiveChannelId] = useState(defaultActiveChannelId);
  const dispatch = useDispatch();
  const { data, error, isLoading, refetch } = useGetChannelsQuery();

  const userData = JSON.parse(localStorage.getItem('userData'));
  const { username } = userData;

  //не совсем понял необходимость этого блока
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log('user connected');
    });
    socket.on('newMessage', (payload) => {
      console.log(payload, 'payload newMess');
      const patchCollection = dispatch(
        messagesApi.util.updateQueryData('getMessages', undefined, (draftMessages) => {
          draftMessages.push(payload);
        }),
      )
    });
    socket.on('newChannel', (payload) => {
      console.log(payload, 'payload newChannel');
      dispatch(
        channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
          draftChannels.push(payload);
        }),
      )
    });
    socket.on('removeChannel', (payload) => dispatch(
      channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
        const index = draftChannels.findIndex(ch => ch.id === payload);
        draftChannels.splice(index, 1);
      }),
    ));
    socket.on('renameChannel', (payload) => dispatch(
      channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
        draftChannels.map((ch) => {
          if (ch.id === payload.id) {
            Object.assign(ch, payload)
          }
        })          
      }),
    ));

    return () => {
      socket.off('connect');
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsComponent activeChannelId={activeChannelId} setActiveChannelId={setActiveChannelId} />
        <MessagesComponent activeChannelId={activeChannelId} />
      </div>
    </div>
  )
};

export default MainPage;