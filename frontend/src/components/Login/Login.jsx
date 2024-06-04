import axios from 'axios';
import React, {useEffect, useRef, useState, useContext} from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import _ from 'lodash';

import { selectors, setUser, removeUser } from '../../redux/userSlice.js';
import logo from '../../pictures/loginImg.jpeg';
import authContext from '../../context/AuthContext.js';
import routes from '../../routes.js';
import { useLoginUserMutation } from '../../redux/index.js';
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
