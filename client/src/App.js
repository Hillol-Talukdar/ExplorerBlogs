import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import TopNavbar from './components/navbar/TopNavbar';
import HomePage from './pages/HomePage';
import PostDetailsPage from './pages/PostDetailsPage';
import LoginPage from './pages/LoginPage';
import AuthContext from './contexts/userAuth/AuthContext';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem('token')) || ''
  );

  const login = (token) => {
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem(token);
    setToken('');
  };

  return (
    <div className="flex-wrapper">
      <AuthContext.Provider
        value={{
          token,
          login,
          logout,
        }}
      >
        <div>
          <ToastContainer />
          <TopNavbar />

          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/post/:id" component={PostDetailsPage} />
            <Route exact path="/login" component={LoginPage} />
          </Switch>
        </div>

        <div className="footer">
          <b>@Hillol Talukdar</b>, All rights reserved
        </div>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
