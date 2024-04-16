import React from 'react';
import { Formik, Form, Field } from 'formik';
import logo from '../pictures/loginImg.jpeg';
import * as Yup from 'yup';

const formSchema = Yup.object().shape({
	username: Yup.string().required('Обязательное поле'),
	email: Yup.string().required('Обязательное поле').email('Неверный email'),
});

const LoginForm = () => {

  return (
		<Formik
		  initialValues={{
      	username: '',
      	email: '',
    	}}
			validationSchema={formSchema}
      onSubmit={ (values) => {
        console.log(values);
      }}
    >
			{({ errors, touched }) => (
				<Form className="col-12 col-md-6 mt-3 mt-mb-0">
      		<h1 className="text-center mb-4">Войти</h1>
					<div className="form-floating mb-3">
						<label htmlFor="username">Ваш ник</label>
						<Field
						id="username"
						name="username"
						type="text"
						autocomplete="username"
						required=""
						placeholder="Ваш ник"
						className="form-control"
						/>
						{errors.username && touched.username ? (
							<div>{errors.username}</div>
						) : null}
					</div>
					<div className="form-floating mb-4">
						<label htmlFor="password" className="form-label">Пароль</label>
      			<Field
							id="password"
							name="password"
							type="password"
							autocomplete="current-password"
							required=""
							placeholder="Пароль"
							className="form-control"
						/>
					</div>
      		<button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
    		</Form>
			)}
    </Formik>
  );
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
								{console.log('дошло до формы')}
								{LoginForm}
							</div>
							<div className="card-footer p-4">
								<div className="text-center">
									<span>Нет аккаунта?</span> <a href="/">Регистрация</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
    )
};

export default Login;
