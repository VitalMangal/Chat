import authContext from '../context/AuthContext.js';

import { useLocation, Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';

const AuthButton = () => {
  const auth = useContext(authContext);
  const location = useLocation();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Log out</Button>
      : null
  );
};

export default AuthButton;

//<Button as={Link} to="/login" state={{ from: location }}>Log in</Button>