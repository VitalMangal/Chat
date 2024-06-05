import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import authContext from '../context/AuthContext.js';

const AuthButton = () => {
  const auth = useContext(authContext);
  const { t } = useTranslation();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>{t('authButton.logOut')}</Button>
      : null
  );
};

export default AuthButton;
