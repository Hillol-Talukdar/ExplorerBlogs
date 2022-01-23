import React, { useContext, useEffect } from 'react';
import LoginForm from '../components/form/login/LoginForm';
import AuthContext from '../contexts/userAuth/AuthContext';

const LoginPage = ({ location, history }) => {
  const authcontext = useContext(AuthContext);
  const { token } = authcontext;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (token) {
      history.push(redirect);
    }
  }, [history, token, redirect]);

  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;
