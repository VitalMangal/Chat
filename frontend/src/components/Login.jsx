import axios from 'axios';
import React, {useEffect, useRef, useState, useContext} from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import logo from '../pictures/loginImg.jpeg';
import authContext from '../context/AuthContext.js';
import routes from '../routes.js';

const formSchema = Yup.object().shape({
	username: Yup.string().required('Обязательное поле').trim(),
	password: Yup.string().required('Обязательное поле'),
});

const LoginForm = () => {
  const auth = useContext(authContext);
	const navigate = useNavigate();
	const inputRef = useRef();
	const [authFailed, setAuthFailed] = useState(false);

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
      console.log('submit');
      setAuthFailed(false);

      try {
        console.log(values);
				setAuthFailed(false);
				const res = await axios.post(routes.loginPath(), values);
				console.log(res, 'res');
				localStorage.setItem('userId', JSON.stringify(res.data));
        console.log(localStorage.getItem('userId'));
				auth.logIn();
				navigate("/");
      } catch (err) {
        console.log(err);
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
      <h1 className="text-center mb-4">Войти</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder="Ваш ник"
          name="username"
          id="username"
          autoComplete="username"
          isInvalid={authFailed}
          required
          ref={inputRef}
          type="text"
        />
        <Form.Label htmlFor="username">Ваш ник</Form.Label>
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
          placeholder="Пароль"
          isInvalid={authFailed}
        />
        <Form.Label htmlFor="password" className="form-label">Пароль</Form.Label>
        <Form.Control.Feedback type="invalid">Неверное имя пользователя или пароль</Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>
    </Form>
  )
};

const Login = () => {
    return (
			<div className="container-fluid h-100">
				<div className="row justify-content-center align-content-center h-100">
					<div className="col-12 col-md-8 col-xxl-6">
						<div className="card shadow-sm">
							<div className="card-body row p-5">
								<div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
									<img src={logo} className="rounded-circle" alt="Войти" />
								</div>
								<LoginForm />
							</div>
							<div className="card-footer p-4">
								<div className="text-center">
									<span>Нет аккаунта?</span> <a href="/registration">Регистрация</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
    )
};

export default Login;
