import React from 'react';

const registrationFormSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'errors.rangeLetter')
    .max(20, 'errors.rangeLetter')
    .required('errors.required'),
  password: yup
    .string()
    .min(6, 'errors.minLetter')
    .required('errors.required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'errors.checkPassword')
    .required('errors.required'),
});

const registrationForm = () => {

  useEffect(() => {
    inputRef.current.focus();
  }, []);

	const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
		validationSchema: registrationFormSchema,
    onSubmit: async (values) => {
      console.log('submit registration');
      // setAuthFailed(false); ?? смотря как реализовать красные поля во время ошибки

      try {
        // setAuthFailed(false);
				const res = await axios.post(routes.loginPath(), values);
        const { data } = res;
        // Здесь выводится предупреждение про Id
        data.id = _.uniqueId();
        dispatch(setUser(data));
        // console.log(data, 'data dispatch');
        data.userLoggedIn = true;
				localStorage.setItem('userData', JSON.stringify(data));
				auth.logIn();
				navigate("/");
      } catch (err) {
        console.log(err, 'error');
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

  return(
    <Form class="w-50" onSubmit={formik.handleSubmit}>
      <h1 class="text-center mb-4">Регистрация</h1>
      <Form.Group class="form-floating mb-3">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder="От 3 до 20 символов"
          name="username"
          autocomplete="username"
          id="username"
          isInvalid={!!errors.username}
          ref={inputRef}
        />
        <Form.Label>{/*for="username"*/}Имя пользователя</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip>
          {errors.username/* placement="right" Обязательное поле*/}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group class="form-floating mb-3">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Не менее 6 символов"
          name="password"
          aria-describedby="passwordHelpBlock"
          autocomplete="new-password"
          type="password"
          id="password"
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {errors.password/* placement="right" Обязательное поле*/}
        </Form.Control.Feedback>
        <Form.Label>{/*for="password"*/}Пароль</Form.Label>
      </Form.Group>
      <Form.Group class="form-floating mb-4">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          placeholder="Пароли должны совпадать"
          name="confirmPassword"
          autocomplete="new-password"
          type="password"
          id="confirmPassword"
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {errors.confirmPassword/* placement="right"*/}
        </Form.Control.Feedback>
        <Form.Label>{/*for="password"*/}Подтвердите пароль</Form.Label>
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100">Зарегистрироваться</Button>
    </Form>
  )
};

const Registration = () => {
    return (
			<p>Форма регистрации</p>
    )
};

export default Registration;


