import React, {useEffect, useRef, useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import authContext from '../context/AuthContext.js';
import routes from '../routes.js';

const MainPage = () => {

  useEffect(() => {
    const getChannels = async () => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const { token } = userData;
      const response = await axios.get('/api/v1/channels', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response, 'response');
    };
    getChannels();
  }, [])

    return (
      <p>Главная страница</p>
    )
};

export default MainPage;

/* Проверка на токен
import React, {useEffect, useRef, useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import authContext from '../context/AuthContext.js';
import routes from '../routes.js';

  const [getHeader, setGetHeader] = useState('');
  const auth = useContext(authContext);
	const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    console.log(userData, 'userData');

    if (userData && userData.token) {
      setGetHeader({ Authorization: `Bearer ${userData.token}` });
      return;
    }
    auth.logOut();
    navigate("/login");
  }, [])
  */
