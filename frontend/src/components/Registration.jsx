import axios from 'axios';
import React, {useEffect, useRef, useState, useContext} from 'react';
import * as formik from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import _ from 'lodash';

import { selectors, setUser, removeUser } from '../slices/userSlice.js';
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

  const registrationFormSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, 'min3')
      .max(20, 'max 20')
      .required('required'),
    password: yup
      .string()
      .min(6, 'min 6')
      .required('required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'checkPassword')
      .required('required'),
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const regSubmit = async (values) => {
    setIsLoading(true);
    console.log('submit registration');

    const { confirmPassword, ...newUser } = values;
    const res = await axios.post(routes.signUpPath(), newUser);
    const { data } = res;
    data.id = 1; //_.uniqueId();
    dispatch(setUser(data));
    console.log(data, 'data dispatch newUser');
    data.userLoggedIn = true;
    localStorage.setItem('userData', JSON.stringify(data));
    auth.logIn();
    setIsLoading(false);
    navigate("/");
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
        <h1 className="text-center mb-4">Регистрация</h1>
        <Form.Group className="form-floating mb-3 position-relative">
          <Form.Control
            onChange={handleChange}
            value={values.username}
            placeholder="От 3 до 20 символов"
            name="username"
            autoComplete="username"
            id="username"
            isInvalid={touched.username && !!errors.username}
            ref={inputRef}
            type="text"
            disabled={isLoading}
          />
          <Form.Label>Имя пользователя</Form.Label>
          <Form.Control.Feedback type="invalid" tooltip>
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-floating mb-3 position-relative">
          <Form.Control
            onChange={handleChange}
            value={values.password}
            placeholder="Не менее 6 символов"
            name="password"
            aria-describedby="passwordHelpBlock"
            autoComplete="new-password"
            type="password"
            id="password"
            isInvalid={touched.password && !!errors.password}
            disabled={isLoading}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {errors.password}
          </Form.Control.Feedback>
          <Form.Label>Пароль</Form.Label>
        </Form.Group>
        <Form.Group className="form-floating mb-4 position-relative">
          <Form.Control
            onChange={handleChange}
            value={values.confirmPassword}
            placeholder="Пароли должны совпадать"
            name="confirmPassword"
            autoComplete="new-password"
            type="password"
            id="confirmPassword"
            isInvalid={touched.confirmPassword && !!errors.confirmPassword}
            disabled={isLoading}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {errors.confirmPassword}
          </Form.Control.Feedback>
          <Form.Label>Подтвердите пароль</Form.Label>
        </Form.Group>
        <Button
          disabled={isLoading}
          type="submit"
          variant="outline-primary"
          className="w-100"
        >
          Зарегистрироваться
        </Button>
      </Form>
            )}
    </Formik>
  )
};

const Registration = () => {
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={regLogo} className="rounded-circle" alt="Регистрация" />
              </div>
              <RegistrationForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Registration;
