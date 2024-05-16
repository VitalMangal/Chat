import React, {useEffect, useRef, useState, useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import cn from 'classnames';
import { io } from "socket.io-client";

import authContext from '../../context/AuthContext.js';
import routes from '../../routes.js';
import ChannelsComponent from './ChannelsComponent.js';

import { selectorsChannels, setChannels, addChannel, updateChannel, removeChannel } from '../../slices/channelsSlice.js';
import { selectorsMessages, addMessage, updateMessage, removeMessage, setMessages } from '../../slices/messagesSlice.js';
import { selectorsUser, setUser, removeUser } from '../../slices/userSlice.js';

  // const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5001';
  // const socket = io(URL);
const socket = io();

const MessageForm = ({ activeChannelId }) => {
  //хз
  // const auth = useContext(authContext);
  // const { activeChannelId } = props;
	const inputRef = useRef();
	useEffect(() => {
    inputRef.current.focus();
  }, []);


	const formik = useFormik({
    initialValues: {
      body: '',
      channelId: activeChannelId,
      username: '',
    },
    onSubmit: async (values) => {
      console.log(values, 'values add message');
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const { token, username } = userData;
        formik.values.username = username;
        const res = await axios.post(routes.messagesPath(), values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        formik.values.body = '';
        //console.log(res, 'res add message');
      } catch (err) {
        console.log(err, 'add message error');
        formik.setSubmitting(false);
        // не знаю что это значит
        if (err.isAxiosError && err.response.status === 401) {
          inputRef.current.select();
          return;
        }
        throw err;
      }
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
          aria-label="Новое сообщение"
          placeholder="Введите сообщение..."
          className="border-0 p-0 ps-2 form-control"
          ref={inputRef}
          type="text"                      
        />
        {/* изменить оформление кнопки variant="light"*/}
        <Button type="submit" disabled="" variant="light" className="btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
          </svg>
          <span className="visually-hidden">Отправить</span>
        </Button>
      </Form.Group>
    </Form>
  )
};

const MainPage = () => {
  const [activeChannelId, setActiveChannelId] = useState('1');
  const dispatch = useDispatch();

  //получаем каналы при входе
  useEffect(() => {
    const getChannels = async () => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const { token } = userData;
      const response = await axios.get(routes.channelsPath(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response, 'response');
      dispatch(setChannels(response.data));
    };
    getChannels();
  }, [])

  //получаем сообщения при входе
  useEffect(() => {
    const getMessages = async () => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const { token } = userData;
      const response = await axios.get(routes.messagesPath(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response, 'messages response');
      dispatch(setMessages(response.data));
    };
    getMessages();
  }, [])

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
        console.log(payload, 'newMessage socet'); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
        dispatch(addMessage(payload));
      });
      socket.on('newChannel', (payload) => {
        console.log(payload, 'new Channel soccet'); // { id: 6, name: "new channel", removable: true }
        dispatch(addChannel(payload));
      });
    });
  }, []);

  const channels = useSelector(selectorsChannels.selectAll);
  const messages = useSelector(selectorsMessages.selectAll);
  console.log(channels, 'channels');

    return (
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <ChannelsComponent activeChannelId={activeChannelId} setActiveChannelId={setActiveChannelId} />
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b># general</b> {/*активнй канал*/}
                </p>
                {/*поменять на кол-во сообщений в отдельном чате*/}
                <span className="text-muted">{messages.length} сообщений</span>
              </div>
              <div id="messages-box" className="chat-messages overflow-auto px-5 ">
                {messages.map((message) => {
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
        </div>
      </div>
    )
};

export default MainPage;


/*
<div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>Каналы</b>
              <button type="button" className="p-0 text-primary btn btn-group-vertical">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
                </svg>
                <span className="visually-hidden">+</span>
              </button>
            </div>
            <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
              {channels.map((channel) => {
                const btnClasses = cn('w-100', 'rounded-0', 'text-start', 'btn', {
                  'btn-secondary': activeChannelId === channel.id,
                });
                return(
                  <li className="nav-item w-100" key={channel.id}>
                    <button type="button" className={btnClasses}>
                      <span className="me-1">#</span>
                        {channel.name}
                    </button>
                  </li>
                )              
              })}
            </ul>
          </div>
          */