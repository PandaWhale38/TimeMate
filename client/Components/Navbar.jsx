import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Button } from 'bootstrap';

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
        TimeMate
      </Link>
      <div>
      {!authenticated && (
        <Link to="/">
          <button>Login</button>
        </Link>
      )}
      {!authenticated && (
        <Link to="/signup">
          <button>Signup</button>
        </Link>
      )}
        {(authenticated && user.Success === 'Worker') && (
          <>
          <Link to="/worker">
            <button>Main Page</button>
            </Link>
          <Link to="/tasks">
            <button>Task Page</button>
          </Link>
          </>
        )}
        {(authenticated && user.Success === 'Manager') && (
          <>
        <Link to="/signup">
          <button>Signup Employee</button>
        </Link>
        <Link to="/dashboard">
          <button>Dashboard</button>
        </Link>
        <Link to="/tasks">
          <button>Task Page</button>
        </Link>
          </>
      )}
      </div>
    </div>
  );
};

export default Navbar;
