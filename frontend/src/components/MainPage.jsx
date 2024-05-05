import React, {useEffect, useRef, useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import authContext from '../context/AuthContext.js';
import routes from '../routes.js';

const MainPage = () => {
  const [getHeader, setGetHeader] = useState('');
  const auth = useContext(authContext);
	const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData && userData.token) {
      setGetHeader({ Authorization: `Bearer ${userData.token}` });
      return;
    }
    auth.logOut();
    navigate("/login");
  }, [])
    return (
      <p>Главная страница</p>
    )
};

export default MainPage;

/*
const PrivatePage = () => {
// BEGIN (write your solution here)
  const [data, setData] = useState('');
    useEffect(() => {
      axios.get(routes.usersPath(), {
      headers: getAuthHeader(),
      })
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
    }, []);

  return (
    <p>{data}</p>
  )
// END
};
*/