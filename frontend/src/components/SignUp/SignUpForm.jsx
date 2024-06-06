import React, {
  useEffect, useRef, useState, useContext,
} from 'react';
import * as formik from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import authContext from '../../context/AuthContext.js';
import { useSignUpUserMutation } from '../../redux';

const SignUpForm = () => {
  const [signUpUser] = useSignUpUserMutation();
  const { Formik } = formik;
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
    const { confirmPassword, ...newUser } = values;

    signUpUser(newUser).unwrap()
      .then((response) => {
        const newData = { ...response, userLoggedIn: true };
        localStorage.setItem('userData', JSON.stringify(newData));
        auth.logIn();
        setIsLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.status === 409) {
          setSubmitError('submitError');
          inputRef.current.select();
          return;
        }
        throw error;
      });
  };

  return (
    <Formik
      validationSchema={registrationFormSchema}
      onSubmit={regSubmit}
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
    >
      {({
        handleSubmit, handleChange, values, touched, errors,
      }) => (
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
              isInvalid={(touched.username && !!errors.username) || !!submitError}
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
              isInvalid={(touched.password && !!errors.password) || !!submitError}
              disabled={isLoading}
            />
            <Form.Label>{t('signUp.password')}</Form.Label>
            <Form.Control.Feedback type="invalid" tooltip>
              {getErrorText('password', errors.password)}
            </Form.Control.Feedback>
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
              isInvalid={(touched.confirmPassword && !!errors.confirmPassword) || !!submitError}
              disabled={isLoading}
            />
            <Form.Label>{t('signUp.confirmPassword')}</Form.Label>
            <Form.Control.Feedback type="invalid" tooltip>
              {getErrorText('confirmPassword', errors.confirmPassword) || getErrorText('submitError', submitError)}
            </Form.Control.Feedback>
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
  );
};
export default SignUpForm;
