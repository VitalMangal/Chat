import AuthContext from './AuthContext.js';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { removeUser } from '../slices/userSlice.js';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [loggedIn, setLoggedIn] = useState(userData ? userData.userLoggedIn : false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userData');
    dispatch(removeUser());
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthProvider;