const ru = {
  translation: {
    app: {
      label: 'Hexlet Chat',
    },
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
      errors: {
        incorrect: 'Неверное имя пользователя или пароль',
        required: 'Обязательное поле',
      },
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
      error: 'Ошибка при загрузке списка каналов',
      plus: '+',
    },
    messages: {
      label: 'Новое сообщение',
      placeholder: 'Введите сообщение...',
      send: 'Отправить',
      errors: {
        send: 'Ошибка при отправке сообщения',
        loading: 'Ошибка при загрузке сообщений',
      },
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
        added: 'Канал создан',
        errors: {
          length: 'От 3 до 20 символов',
          required: 'Обязательное поле',
          notUnique: 'Должно быть уникальным',
          notAdded: 'Ошибка при создании канала',
        },
      },
      remove: {
        title: 'Удалить канал',
        body: 'Уверены?',
        cancel: 'Отменить',
        send: 'Удалить',
        removed: 'Канал удален',
        notRemoved: 'Ошибка при удалении канала',
      },
      rename: {
        title: 'Переименовать канал',
        label: 'Новое название канала',
        cancel: 'Отменить',
        send: 'Отправить',
        renamed: 'Канал переименован',
        errors: {
          length: 'От 3 до 20 символов',
          required: 'Обязательное поле',
          notUnique: 'Должно быть уникальным',
          notRenamed: 'Ошибка при переименовании канала',
        },
      },
    },
  },

};

export default ru;
