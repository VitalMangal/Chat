import axios from 'axios';
import React, {useEffect, useRef, useState, useContext} from 'react';
import * as formik from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import _ from 'lodash';

import { selectors, setUser, removeUser } from '../redux/userSlice.js';
import regLogo from '../pictures/RegImg.jpg';
import authContext from '../context/AuthContext.js';
import routes from '../routes.js';

const RegistrationForm = () => {
  const { Formik } = formik;
  const dispatch = useDispatch();
  const auth = useContext(authContext);
	const navigate = useNavigate();
	const inputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const { t } = useTranslation();

  const getErrorText = (formField, error) => {
    if (!error) {
      return null;
    }
    return t(`signUp.errors.${formField}.${error}`);
  };

  const registrationFormSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, 'length')
      .max(20, 'length')
      .required('required'),
    password: yup
      .string()
      .min(6, 'length')
      .required('required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'passwordsMustMatch')
      .required('required'),
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const regSubmit = async (values) => {
    setIsLoading(true);
    setSubmitError(null);
    try{
      const { confirmPassword, ...newUser } = values;
      const res = await axios.post(routes.signUpPath(), newUser);
      const { data } = res;
      data.id = 1; //_.uniqueId();
      dispatch(setUser(data));
      data.userLoggedIn = true;
      localStorage.setItem('userData', JSON.stringify(data));
      auth.logIn();
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      setIsLoading(false);
      if (err.isAxiosError && err.response.status === 409) {
        setSubmitError('submitError');
        inputRef.current.select();
        return;
      }
    throw err;
    }
  }

  return(
    <Formik
      validationSchema={registrationFormSchema}
      onSubmit={regSubmit}
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
      <Form className="w-50" onSubmit={handleSubmit}>
        <h1 className="text-center mb-4">{t('signUp.registration')}</h1>
        <Form.Group className="form-floating mb-3 position-relative">
          <Form.Control
            onChange={handleChange}
            value={values.username}
            placeholder={t('signUp.username')}
            name="username"
            autoComplete="username"
            id="username"
            isInvalid={touched.username && !!errors.username || !!submitError}
            ref={inputRef}
            type="text"
            disabled={isLoading}
          />
          <Form.Label>{t('signUp.username')}</Form.Label>
          <Form.Control.Feedback type="invalid" tooltip>
            {getErrorText('username', errors.username)}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-floating mb-3 position-relative">
          <Form.Control
            onChange={handleChange}
            value={values.password}
            placeholder={t('signUp.password')}
            name="password"
            aria-describedby="passwordHelpBlock"
            autoComplete="new-password"
            type="password"
            id="password"
            isInvalid={touched.password && !!errors.password || !!submitError}
            disabled={isLoading}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {getErrorText('password', errors.password)}
          </Form.Control.Feedback>
          <Form.Label>{t('signUp.password')}</Form.Label>
        </Form.Group>
        <Form.Group className="form-floating mb-4 position-relative">
          <Form.Control
            onChange={handleChange}
            value={values.confirmPassword}
            placeholder={t('signUp.confirmPassword')}
            name="confirmPassword"
            autoComplete="new-password"
            type="password"
            id="confirmPassword"
            isInvalid={touched.confirmPassword && !!errors.confirmPassword || !!submitError}
            disabled={isLoading}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {getErrorText('confirmPassword', errors.confirmPassword) || getErrorText('submitError', submitError)}
          </Form.Control.Feedback>
          <Form.Label>{t('signUp.confirmPassword')}</Form.Label>
        </Form.Group>
        <Button
          disabled={isLoading}
          type="submit"
          variant="outline-primary"
          className="w-100"
        >
          {t('signUp.register')}
        </Button>
      </Form>
            )}
    </Formik>
  )
};

const SignUp = () => {
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={regLogo} className="rounded-circle" alt="registration" />
              </div>
              <RegistrationForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SignUp;
