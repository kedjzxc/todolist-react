import React, { useContext } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { set, useForm } from 'react-hook-form';
import axios from 'axios';
import './form.scss';
import { CustomContext } from '../../utils/Context';

const Form = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const { setUser, user } = useContext(CustomContext);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const handleForm = (data) => {
    axios
      .post('http://localhost:8080/register', {
        ...data,
        categories: [],
      })
      .then((res) => {
        setUser({
          token: res.data.accessToken,
          ...res.data.user,
        });
        localStorage.setItem(
          'user',
          JSON.stringify({ token: res.data.accessToken, ...res.data.user }),
        );
        reset();
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  const loginUser = (data) => {
    axios
      .post('http://localhost:8080/login', {
        ...data,
      })
      .then((res) => {
        setUser({
          token: res.data.accessToken,
          ...res.data.user,
        });
        localStorage.setItem(
          'user',
          JSON.stringify({ token: res.data.accessToken, ...res.data.user }),
        );
        reset();
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = (data) => {
    location.pathname === '/register' ? handleForm(data) : loginUser(data);
  };

  if (user.email.length) {
    return <Navigate to="/" />;
  }

  return (
    <form noValidate className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form__title">{location.pathname === '/register' ? 'Регистрация' : 'Войти'}</h2>

      {location.pathname === '/register' ? (
        <>
          <input
            {...register('login', {
              required: {
                message: 'Поле логин обязательно для заполнения',
                value: true,
              },
              maxLength: {
                message: 'Максимальная длина 10 символов',
                value: 10,
              },
              minLength: {
                message: 'Минимальная длина 3 символа',
                value: 3,
              },
            })}
            className="form__input"
            type="text"
            placeholder="Введите логин"
          />

          <p className="form__error">{errors.login && errors.login.message}</p>
        </>
      ) : (
        ''
      )}

      <input
        {...register('email', {
          required: {
            message: 'Поле email обязательно к заполнению',
            value: true,
          },
          minLength: {
            message: 'Минимальная длина 10 символов',
            value: 10,
          },
          pattern: {
            message: 'Напишите свой email правильно',
            value: /^[^ ]+@[^ ]+\.[a-z]{2,5}$/,
          },
        })}
        className="form__input"
        type="Email"
        placeholder="Введите Email"
      />
      <p className="form__error">{errors.email && errors.email.message}</p>
      <input
        {...register('password', {
          required: {
            message: 'Поле password обязательно для заполнения',
            value: true,
          },
          pattern: {
            message: 'Пароль должен содержать не менее 8 символов, заглавную букву и число',
            value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
          },
        })}
        className="form__input"
        type="password"
        placeholder="Введите пароль"
      />
      <p className="form__error">{errors.password && errors.password.message}</p>
      {/* <input className="form__input" type="password" placeholder="Введите пароль еще раз" /> */}

      <button className="form__btn" type="submit">
        {location.pathname === '/register' ? 'Зарегистрироваться' : 'Войти'}
      </button>

      <p className="form__text">
        {location.pathname === '/register' ? (
          <>
            У вас уже есть аккаунт?{' '}
            <Link className="form__link" to="/login">
              Войти
            </Link>
          </>
        ) : (
          <>
            Ееще нет акканута ?{' '}
            <Link className="form__link" to="/register">
              Зарегистрироваться
            </Link>
          </>
        )}
      </p>
    </form>
  );
};

export default Form;
