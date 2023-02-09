import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
// import { Button } from 'bootstrap';
import Button from 'react-bootstrap/Button';

const Navbar = ({ user, authenticated }) => {
  return (
    <div id="Navbar">
      {/* logo woudl go here  */}
      <Link
        id="NavbarHome"
        to={
          authenticated
            ? user.Success === 'Worker'
              ? '/worker'
              : '/manager'
            : '/'
        }
      >
        <h2 id="timeMate">TimeMate</h2>
      </Link>
      <div className="buttonContainer">
        {!authenticated && (
          <Link className="navbutton" to="/">
            <Button>Login</Button>
          </Link>
        )}
        {!authenticated && (
          <Link className="navbutton" to="/signup">
            <Button>Signup</Button>
          </Link>
        )}
        {authenticated && user.Success === 'Worker' && (
          <>
            <Link className="navbutton" to="/worker">
              <Button>Main Page</Button>
            </Link>
            <Link className="navbutton" to="/tasks">
              <Button>Task Page</Button>
            </Link>
          </>
        )}
        {authenticated && user.Success === 'Manager' && (
          <>
            <Link className="navbutton" to="/signup">
              <Button>Signup Employee</Button>
            </Link>
            <Link className="navbutton" to="/manager">
              <Button>Dashboard</Button>
            </Link>
            <Link className="navbutton" to="/tasks">
              <Button>Task Page</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
