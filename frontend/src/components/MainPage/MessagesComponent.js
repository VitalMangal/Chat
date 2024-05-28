import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

import routes from '../../routes.js';

import { selectorsChannels, setChannels, addChannel, updateChannel, removeChannel } from '../../slices/channelsSlice.js';
import { selectorsMessages, addMessage, updateMessage, removeMessage, setMessages } from '../../slices/messagesSlice.js';

import { useGetChannelsQuery, useGetMessagesQuery, useAddMessageMutation, } from '../../redux/index.js'

const MessageForm = ({ activeChannelId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

	const inputRef = useRef();
	useEffect(() => {
    inputRef.current.focus();
  }, [activeChannelId]);

  const [
    addMessage,
    { data: response, error: addUserError, isLoading: isAddingMessage },
  ] = useAddMessageMutation();

	const formik = useFormik({
    initialValues: {
      body: '',
      channelId: '',
      username: '',
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      //поменять на получение username из api
      const userData = JSON.parse(localStorage.getItem('userData'));
      const { username } = userData;
      formik.values.username = username;
      formik.values.channelId = activeChannelId;
      await addMessage(values).unwrap();
      formik.values.body = '';
      setIsLoading(false);
        // не работает автофокус на поле ввода после отправки сообщения
      inputRef.current.focus();
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} noValidate="" className="py-1 border rounded-2">
      <Form.Group className="input-group has-validation">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.body}
          name="body"
          id="body"
          aria-label={t('messages.label')}
          placeholder={t('messages.placeholder')}
          className="border-0 p-0 ps-2 form-control"
          ref={inputRef}
          type="text"
          disabled={isLoading}                    
        />
        {/* изменить оформление кнопки variant="light"*/}
        <Button disabled={isLoading} type="submit" variant="light" className="btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
          </svg>
          <span className="visually-hidden">{t('messages.send')}</span>
        </Button>
      </Form.Group>
    </Form>
  )
};

const MessagesComponent = ({ activeChannelId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: messages } = useGetMessagesQuery();
  const { data: channels } = useGetChannelsQuery();
  console.log(messages, 'messages from mess');
  
  const activeChannel = !!channels ? channels.filter((channel) => channel.id === activeChannelId ) : [];

  const messagesFromActiveChannel = !!messages ? messages.filter((mess) => mess.channelId === activeChannelId) : [];

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{activeChannel?.name}</b>
          </p>
          <span className="text-muted">{t('messages.mess', { count: messagesFromActiveChannel.length })}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messagesFromActiveChannel.map((message) => {
            return(
              <div className="text-break mb-2" key={message.id}>
                <b>{message.username}</b>: {message.body}
              </div>
            )              
          })}
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm activeChannelId={activeChannelId}/>
        </div>
      </div>
    </div>
  )
};

export default MessagesComponent;