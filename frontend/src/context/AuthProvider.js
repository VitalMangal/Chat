import React, { useState, useMemo } from 'react';
import AuthContext from './AuthContext.js';

const AuthProvider = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [loggedIn, setLoggedIn] = useState(userData ? userData.userLoggedIn : false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userData');
    setLoggedIn(false);
  };
  let props = useMemo(() => { loggedIn, logIn, logOut }, [loggedIn]);
  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
