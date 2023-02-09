import React, { Component, useState, useEffect, Fragment } from 'react';
import './public/styles.css';
import LoginPage from './Pages/LoginPage.jsx';
// import RoleBased from './Components/RoleBased.jsx';
import EmployeePage from './Pages/EmployeePage.jsx';
import ManagerSignup from './Pages/ManagerSignup.jsx';
import ManagerPage from './Pages/ManagerPage.jsx';
import TaskPage from './Pages/TaskPage.jsx';
import Navbar from './Components/Navbar.jsx';
import { Routes, Route } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

//refactored
const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({
    Success: '',
    emp_id: '',
    first_name: '',
    emp_location: '',
  });
  const [loginFailed, setLoginFailed] = useState(false);
  const navigate = useNavigate();
  let location = useLocation();

  const handleLogout = () => {
    console.log('logged out');
    setAuthenticated(false);
    setUser({
      Success: '',
      emp_id: '',
      first_name: '',
      emp_location: '',
    });
    navigate('/');
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
      // const {Success,emp_id,first_name} =json;

      if (response.ok) {
        setUser({
          Success: json.Success,
          emp_id: json.emp_id,
          first_name: json.first_name,
          emp_location: json.emp_location,
        });
        setAuthenticated(true);

        console.log(authenticated);

        console.log('user', user);
      } else {
        setLoginFailed(true);
        console.log('loginFailed', loginFailed);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (authenticated && location.pathname === '/') {
      user.Success === 'Manager' ? navigate('/manager') : navigate('/worker');
    }
  }, [authenticated, user, navigate]);

  console.log('user', user);

  return (
    <>
      <Navbar user={user} authenticated={authenticated} />
      <>
        <Routes>
          <Route
            path="/"
            element={
              <LoginPage onLogin={handleLogin} loginFailed={loginFailed} />
            }
          />
          <Route
            path="/worker"
            element={<EmployeePage user={user} logOut={handleLogout} />}
          />
          <Route
            path="/manager"
            element={<ManagerPage user={user} logOut={handleLogout} />}
          />
          <Route
            path="/signup"
            element={<ManagerSignup user={user} />}
          />
          <Route
            path="/tasks"
            element={<TaskPage user={user} />}
          />
        </Routes>
      </>
    </>
  );
};

export default App;
