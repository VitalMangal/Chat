import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import ChannelsComponent from './ChannelsComponent/ChannelsComponent.js';
import MessagesComponent from './MessagesComponent/MessagesComponent.js';
import { channelsApi, messagesApi } from '../../store/index.js';
import { useData } from '../../hooks';
import defaultActiveChannelId from '../../utils/defaultActiveChannelId.js';

const MainPage = () => {
  const { socket } = useData();
  const [activeChannelId, setActiveChannelId] = useState(defaultActiveChannelId);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(
        messagesApi.util.updateQueryData('getMessages', undefined, (draftMessages) => {
          draftMessages.push(payload);
        }),
      );
    });
    socket.on('newChannel', (payload) => {
      dispatch(
        channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
          draftChannels.push(payload);
        }),
      );
    });
    socket.on('removeChannel', (payload) => {
      dispatch(
        channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
          const index = draftChannels.findIndex((ch) => ch.id === payload);
          draftChannels.splice(index, 1);
        }),
      );
      if (activeChannelId === payload.id) {
        setActiveChannelId(defaultActiveChannelId);
      }
    });
    socket.on('renameChannel', (payload) => {
      dispatch(
        channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
          draftChannels.map((ch) => {
            if (ch.id === payload.id) {
              return Object.assign(ch, payload);
            }
            return ch;
          });
        }),
      );
    });

    return () => {
      socket.off('connect');
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, [activeChannelId, dispatch, socket]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsComponent
          activeChannelId={activeChannelId}
          setActiveChannelId={setActiveChannelId}
        />
        <MessagesComponent activeChannelId={activeChannelId} />
      </div>
    </div>
  );
};

export default MainPage;
