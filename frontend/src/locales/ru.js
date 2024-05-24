const ru = {
  translation: {
    signUp: {
      errors: {
        username: {
          length: 'От 3 до 20 символов',
          required: 'Обязательное поле',
        },
        password: {
          length: 'Не менее 6 символов',
          required: 'Обязательное поле',
        },
        confirmPassword: {
          passwordsMustMatch: 'Пароли должны совпадать',
          required: 'Обязательное поле',
        },
        submitError: {
          submitError: 'Такой пользователь уже существует',
        },
      },
      registration: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      register: 'Зарегистрироваться',
    },
    login: {
      come: 'Войти',
      nickname: 'Ваш ник',
      password: 'Пароль',
      error: 'Неверное имя пользователя или пароль',
      doNotHaveAnAccount: 'Нет аккаунта?',
      registration: 'Регистрация',
    },
    notFound: {
      notFound: 'Страница не найдена',
      butMove: 'Но вы можете перейти',
      toHomePage: ' на главную страницу',
    },
    authButton: {
      logOut: 'Выйти',
    },
    channels: {
      channels: 'Каналы',
      remove: 'Удалить',
      rename: 'Переименовать',
    },
    messages: {
      label: 'Новое сообщение',
      placeholder: 'Введите сообщение...',
      send: 'Отправить',
      mess_one: '{{count}} сообщение',
      mess_few: '{{count}} сообщения',
      mess_many: '{{count}} сообщений',
    },
    modal: {
      add: {
        title: 'Добавить канал',
        label: 'Название нового канала',
        cancel: 'Отменить',
        send: 'Отправить',
        errors: {
          length: 'От 3 до 20 символов',
          required: 'Обязательное поле',
          notUnique: 'Должно быть уникальным',
        },
      },
      remove: {
        title: 'Удалить канал',
        body: 'Уверены?',
        cancel: 'Отменить',
        send: 'Удалить',
      },
      rename: {
        title: 'Переименовать канал',
        label: 'Новое название канала',
        cancel: 'Отменить',
        send: 'Отправить',
        errors: {
          length: 'От 3 до 20 символов',
          required: 'Обязательное поле',
          notUnique: 'Должно быть уникальным',
        },
      },
    }
  },

};

export default ru;