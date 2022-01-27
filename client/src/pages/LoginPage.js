import React, { useContext, useEffect } from 'react';
import LoginForm from '../components/form/login/LoginForm';

const LoginPage = ({ location, history }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    ? JSON.parse(localStorage.getItem('userInfo'))
    : '';

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;
