import React, {useEffect, useRef, useState, useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { io } from "socket.io-client";

import ChannelsComponent from './ChannelsComponent.js';
import MessagesComponent from './MessagesComponent.js';

import {channelsApi} from '../../redux';
import {messagesApi} from '../../redux';

import { useGetChannelsQuery, useGetMessagesQuery, useAddMessageMutation, } from '../../redux/index.js'
  // const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5001';
  // const socket = io(URL);
const socket = io();
const defaultActiveChannelId = '1';

const MainPage = () => {
  const [activeChannelId, setActiveChannelId] = useState(defaultActiveChannelId);
  const dispatch = useDispatch();
  const { data, error, isLoading, refetch } = useGetMessagesQuery;

  const userData = JSON.parse(localStorage.getItem('userData'));
  const { username } = userData;

  //не совсем понял необходимость этого блока
  useEffect(() => {
    // no-op if the socket is already connected
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log('user connected');
      socket.on('newMessage', (payload) => {
        console.log(payload, 'payload newMess');
        dispatch(
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
          draftChannels.filter((ch) => ch.id !== payload);
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
      ))
    });
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