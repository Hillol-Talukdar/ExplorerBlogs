import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import TopNavbar from './components/navbar/TopNavbar';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <>
      <div className="wrapper">
        <TopNavbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </div>

      <div className="footer">
        <b>@Hillol Talukdar</b>, All rights reserved
      </div>
    </>
  );
}

export default App;
