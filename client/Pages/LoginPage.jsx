import React, { Component, Fragment, useState } from 'react';
import LoginButton from '../Components/LoginButton.jsx';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const LoginPage = ({ onLogin, loginFailed }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  return (
    <>
      {loginFailed && <div className="alert alert-danger">Login Failed!</div>}
      <section id="loginPageBox">
        <section id="outterLoginBox">
          <div id="timemate">TimeMate</div>
          <section id="loginBox">
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
            <button className = 'login'
              onClick={() => {
                onLogin({ username, password });
              }}
              id="loginButton"
            >
              Login
            </button>
           <Link to='/signup' >Manager Signup</Link>
          </section>
          
        </section>
      </section>
    </>
  );
};

export default LoginPage;

/*
// const LoginPage = ({ onLogin }) => {
//   const [username, setUserName] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Submitting form');
//     onLogin({ username, password });
//   };
//   return (
//     <Fragment>
//       <div id='timemate'>TimeMate</div>
//       {/* <section id='outterLoginPageBox'>
//         <section id='loginPageBox'>
//           <section id='outterLoginBox'> */
//       {/* <section id='loginBox'> */}
//       <form onSubmit={handleSubmit} style={{ width: '300px' }}>
//         <input
//           type='text'
//           id='username'
//           placeholder='username'
//           value={username}
//           onChange={(e) => setUserName(e.target.value)}
//         />
//         <input
//           type='password'
//           id='password'
//           placeholder='password'
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <input type='submit'> LOG IN </input>
//       </form>
//       {/* </section>
//           </section>
//         </section>
//       </section> */}
//     </Fragment>
//   );
// };
