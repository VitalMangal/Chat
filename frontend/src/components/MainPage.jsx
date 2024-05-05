const MainPage = () => {

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
// Задваивается проверка: тут и в App на auth

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
