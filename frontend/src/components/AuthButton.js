import authContext from '../context/AuthContext.js';

import { useLocation, Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

const AuthButton = () => {
  const auth = useContext(authContext);
  const location = useLocation();
  const { t } = useTranslation();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>{t('authButton.logOut')}</Button>
      : null
  );
};

export default AuthButton;

//<Button as={Link} to="/login" state={{ from: location }}>Log in</Button>