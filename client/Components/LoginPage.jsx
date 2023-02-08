import React, { Component, Fragment, useState } from 'react';
import LoginButton from './LoginButton.jsx';
import UserInput from './UserInput.jsx';

const LoginPage = ({onLogin}) => {
  return (
    <section id="loginPageBox">
      <section id="outterLoginBox">
        <div id="timemate">TimeMate</div>
        <section id="loginBox">
          <input
            id="username"
            type="text"
            htmlFor="username"
            placeholder="username"
          ></input>
          <input
            id="password"
            type="password"
            htmlFor="password"
            placeholder="password"
          ></input>
          <button onClick={onLogin} id="loginButton">
            Login
          </button>
        </section>
      </section>
    </section>
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
