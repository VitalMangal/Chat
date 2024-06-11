import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { useAuth } from '../hooks';

const AuthButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>{t('authButton.logOut')}</Button>
      : null
  );
};

export default AuthButton;
