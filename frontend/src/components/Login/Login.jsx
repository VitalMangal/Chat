import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../pictures/loginImg.jpeg';
import LoginForm from './LoginForm.jsx';

const Login = () => {
  const { t } = useTranslation();
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={logo} className="rounded-circle" alt={t('login.come')} />
              </div>
              <LoginForm />
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('login.doNotHaveAnAccount')}</span>
                {' '}
                <a href="/signup">{t('login.registration')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
