import React, { Component, Fragment, useState } from 'react';
import LoginButton from '../Components/LoginButton.jsx';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ManagerSignup = ({user}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [signedup, setSignedup] = useState(0);
  const [location, setLocation] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const body = {
        first_name,
        last_name,
        username,
        password,
        location,
        emp_role: user.Success==='Worker'?2:1,
        hourly_wage: 20,
      };
      const response = await fetch('http://localhost:8080/create/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await response.json();
      console.log('emp role ',body.emp_role);
      if (response.ok) {
        setSignedup(1);
      } else setSignedup(-1);
    } catch (error) {}
  };

  return (
    <>
      {signedup === 1 && (
        <div className="alert alert-success">Signup Successful!</div>
      )}
      {signedup === -1 && (
        <div className="alert alert-danger">Signup Failed!</div>
      )}
      <section id="loginPageBox">
        <section id="outterLoginBox">
          <div id="timemate">TimeMate</div>
          <section id="loginBox">
            <input
              onChange={(e) => setFirstname(e.target.value)}
              value={first_name}
              id="firstname"
              type="text"
              htmlFor="username"
              placeholder="firstname"
            ></input>
            <input
              onChange={(e) => setLastname(e.target.value)}
              value={last_name}
              id="lastname"
              type="text"
              htmlFor="username"
              placeholder="lastname"
            ></input>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              id="username"
              type="text"
              htmlFor="username"
              placeholder="username"
            ></input>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="password"
              type="password"
              htmlFor="password"
              placeholder="password"
            ></input>
            <div className='selectContainer'>
              <label className="select">Select location: </label>
              <select
                className="selection"
                onChange={(e) => setLocation(e.target.value)}
                name="muscle"
                id="muscle"
              >
                <option value="knoxville">knoxville</option>
                <option value="boston">boston</option>
                <option value="ecuador">ecuador</option>
              </select>
            </div>

            <button className="login" onClick={handleSignup} id="loginButton">
              Signup
            </button>
            <span>
              Already Registered? <Link to="/">Sign in</Link>
            </span>
          </section>
        </section>
      </section>
    </>
  );
};

export default ManagerSignup;
