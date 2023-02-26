import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './register.scss';

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const data = {
    name: {name},
    email: {email},
    password: {password}
  }
  console.log(data);
  const handleSubmit = (e) => {
    e.preventDefault()
    setName(' ')
    setEmail('')
    setPassword('')
  }
  const handleClear = (e) => {
    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className="register">
      <form action="" className="form" onSubmit={handleSubmit}>
        <h2 className="form__title">Регистрация</h2>
        <input onChange={(e) => setName(e.target.value)} className="form__input" type="text" placeholder="Введите логин" />
        <input onChange={(e) => setEmail(e.target.value)} className="form__input" type="Email" placeholder="Введите Email" />
        <input onChange={(e) => setPassword(e.target.value)} className="form__input" type="password" placeholder="Введите пароль" />
        <input className="form__input" type="password" placeholder="Введите пароль еще раз" />

        <button className="form__btn" type="submit" onClick={handleClear}>
          Зарегистрироваться
        </button>

        <p className="form__text">
          У вас уже есть аккаунт?{' '}
          <Link className="form__link" to="/login">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
