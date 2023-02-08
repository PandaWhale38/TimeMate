import React, { Component, useState, useEffect, Fragment } from 'react';
import LoginPage from './Pages/LoginPage.jsx';
import RoleBased from './Components/RoleBased.jsx';
import EmployeePage from './Pages/EmployeePage.jsx';
import './public/styles.css';
import ManagerPage from './Pages/ManagerPage.jsx';
import { Routes, Route } from 'react-router-dom';

//refactored
const App = () => {
  const [authenticated, setAuthenticated] = useState(true);
  const [user, setUser] = useState({
    role: 'worker',
    id: '',
    first_name: '',
  });
  const [loginFailed, setLoginFailed] = useState(false);

  const handleLogout = () => {
    console.log('logged out');
    setAuthenticated(false);
  };

  const handleLogin = async ({ username, password }) => {
    try {
      const body = {
        username,
        password,
      };
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await response.json();
      if (response.ok) {
        setUser(json);
        setAuthenticated(true);
      } else {
        setLoginFailed(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/worker" element={<EmployeePage />} />
        <Route path="/manager" element={<ManagerPage />} />
      </Routes>
      {loginFailed && (
        // alert, alert-danger are flags for bootstrap to displays the div in an overlay and alert style
        <div className="alert alert-danger">Login Failed!</div>
      )}
      {authenticated ? (
        <RoleBased user={user} logOut={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </Fragment>
  );
};

export default App;
