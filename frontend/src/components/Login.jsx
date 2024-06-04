import axios from 'axios';
import React, {useEffect, useRef, useState, useContext} from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import _ from 'lodash';

import { selectors, setUser, removeUser } from '../redux/userSlice.js';
import logo from '../pictures/loginImg.jpeg';
import authContext from '../context/AuthContext.js';
import routes from '../routes.js';



const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = useContext(authContext);
	const navigate = useNavigate();
	const inputRef = useRef();
	const [authFailed, setAuthFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = Yup.object().shape({
    username: Yup.string().required(t('login.errors.required')).trim(),
    password: Yup.string().required(t('login.errors.required')),
  });

	useEffect(() => {
    inputRef.current.focus();
  }, []);

	const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
		validationSchema: formSchema,
    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        setAuthFailed(false);
				const res = await axios.post(routes.loginPath(), values);
        const { data } = res;
        // Здесь выводится предупреждение про Id
        data.id = _.uniqueId();
        dispatch(setUser(data));
        data.userLoggedIn = true;
				localStorage.setItem('userData', JSON.stringify(data));
				auth.logIn();
        setIsLoading(false);
				navigate("/");
      } catch (err) {
        setIsLoading(false);
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">{t('login.come')}</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder={t('login.nickname')}
          name="username"
          id="username"
          autoComplete="username"
          isInvalid={authFailed}
          required
          ref={inputRef}
          type="text"
          disabled={isLoading}
        />
        <Form.Label htmlFor="username">{t('login.nickname')}</Form.Label>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.password}
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder={t('login.password')}
          isInvalid={authFailed}
          disabled={isLoading}
        />
        <Form.Label htmlFor="password" className="form-label">{t('login.password')}</Form.Label>
        <Form.Control.Feedback type="invalid">{t('login.errors.incorrect')}</Form.Control.Feedback>
      </Form.Group>
      <Button
        type="submit"
        variant="outline-primary"
        className="w-100 mb-3"
        disabled={isLoading}
      >
        {t('login.come')}
      </Button>
    </Form>
  )
};

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
									<span>{t('login.doNotHaveAnAccount')}</span> <a href="/signup">{t('login.registration')}</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
    )
};

export default Login;
