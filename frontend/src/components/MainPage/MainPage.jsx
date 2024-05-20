import React, {useEffect, useRef, useState, useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { io } from "socket.io-client";

import ChannelsComponent from './ChannelsComponent.js';
import MessagesComponent from './MessagesComponent.js';

import { selectorsChannels, setChannels, addChannel, updateChannel, removeChannel } from '../../slices/channelsSlice.js';
import { selectorsMessages, addMessage, updateMessage, removeMessage, setMessages } from '../../slices/messagesSlice.js';

  // const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5001';
  // const socket = io(URL);
const socket = io();
const defaultACtiveChannelId = '1';

const MainPage = () => {
  const [activeChannelId, setActiveChannelId] = useState(defaultACtiveChannelId);
  const dispatch = useDispatch();

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
      socket.on('newMessage', (payload) => dispatch(addMessage(payload)));
      socket.on('newChannel', (payload) => dispatch(addChannel(payload)));
      socket.on('removeChannel', (payload) => dispatch(removeChannel(payload.id)));
      socket.on('renameChannel', (payload) => dispatch(updateChannel({ id: payload.id, changes: payload })))
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