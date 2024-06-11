import React, { useState, useMemo } from 'react';
import AuthContext from './AuthContext.js';
import { useStorageGetItem, useStorageSetItem, useStorageRemoveItem } from '../hooks';

const AuthProvider = ({ children }) => {
  const userData = JSON.parse(useStorageGetItem());
  const [loggedIn, setLoggedIn] = useState(userData ? userData.userLoggedIn : false);

  const useLogIn = (data) => {
    useStorageSetItem(data);
    setLoggedIn(true);
  };

  const useLogOut = () => {
    useStorageRemoveItem();
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
