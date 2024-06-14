import React, { useState, useMemo } from 'react';
import AuthContext from './AuthContext.js';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/localStorageFunctions.js';

const AuthProvider = ({ children }) => {
  const userData = JSON.parse(getStorageItem());
  const [loggedIn, setLoggedIn] = useState(userData ? userData.userLoggedIn : false);

  const useLogIn = (data) => {
    setStorageItem(data);
    setLoggedIn(true);
  };

  const useLogOut = () => {
    removeStorageItem();
    setLoggedIn(false);
  };

  const props = useMemo(() => ({ loggedIn, logIn: useLogIn, logOut: useLogOut }), [loggedIn]);
  return (
    <AuthContext.Provider value={props}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
