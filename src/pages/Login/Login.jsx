import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Form from '../../Components/Form';
import './login.scss';

const Login = () => {
  return (
    <div className="login">
      <Form />
    </div>
  );
};

export default Login;
