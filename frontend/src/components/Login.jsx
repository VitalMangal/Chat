import React from 'react';
import { useFormik } from 'formik';
import logo from '../pictures/loginImg.jpeg';

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">Войти</h1>
			<div className="form-floating mb-3">
      	<label htmlFor="username">Ваш ник</label>
      	<input
        	id="username"
        	name="username"
        	type="text"
        	onChange={formik.handleChange}
        	value={formik.values.username}
					autocomplete="username"
					required=""
					placeholder="Ваш ник"
					className="form-control"
      	/>
			</div>
			<div className="form-floating mb-4">
      	<label htmlFor="password" className="form-label">Пароль</label>
      	<input
        	id="password"
        	name="password"
        	type="password"
        	onChange={formik.handleChange}
        	value={formik.values.password}
					autocomplete="current-password"
					required=""
					placeholder="Пароль"
					className="form-control"
      	/>
			</div>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
    </form>
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
