import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import TopNavbar from './components/navbar/TopNavbar';
import HomePage from './pages/HomePage';
import PostDetailsPage from './pages/PostDetailsPage';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  return (
    <div className="flex-wrapper">
      <div>
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
    </div>
  );
}

export default App;
