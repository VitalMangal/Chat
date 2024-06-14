import React, {
  useEffect, useRef, useState,
} from 'react';
import * as formik from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { useAuth } from '../../hooks';
import { useSignUpUserMutation } from '../../store/index.js';
import pages from '../../utils/pages.js';

const SignUpForm = () => {
  const [signUpUser, { isLoading, error: signUpUserError }] = useSignUpUserMutation();
  const { Formik } = formik;
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef();
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

  useEffect(() => {
    if (signUpUserError?.status === 409) {
      setSubmitError('submitError');
      inputRef.current.select();
    }
  }, [signUpUserError, t]);

  const regSubmit = async (values) => {
    setSubmitError(null);
    const { confirmPassword, ...newUser } = values;
    const response = await signUpUser(newUser);
    const newData = { ...response, userLoggedIn: true };
    auth.logIn(newData);
    navigate(pages.main);
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
          <Form.Group controlId="username" className="form-floating mb-3 position-relative">
            <Form.Control
              onChange={handleChange}
              value={values.username}
              placeholder="username"
              name="username"
              autoComplete="username"
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
          <Form.Group controlId="password" className="form-floating mb-3 position-relative">
            <Form.Control
              onChange={handleChange}
              value={values.password}
              placeholder={t('signUp.password')}
              name="password"
              aria-describedby="passwordHelpBlock"
              autoComplete="new-password"
              type="password"
              isInvalid={(touched.password && !!errors.password) || !!submitError}
              disabled={isLoading}
            />
            <Form.Label>{t('signUp.password')}</Form.Label>
            <Form.Control.Feedback type="invalid" tooltip>
              {getErrorText('password', errors.password)}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="form-floating mb-4 position-relative">
            <Form.Control
              onChange={handleChange}
              value={values.confirmPassword}
              placeholder={t('signUp.confirmPassword')}
              name="confirmPassword"
              autoComplete="new-password"
              type="password"
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
