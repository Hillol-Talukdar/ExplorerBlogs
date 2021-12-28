import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import TopNavbar from './components/navbar/TopNavbar';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <>
      <TopNavbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </>
  );
}

export default App;
