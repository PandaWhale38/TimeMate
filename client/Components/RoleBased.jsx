import React, { Fragment } from 'react';
import ManagerPage from './ManagerPage.jsx';
import EmployeePage from './EmployeePage.jsx';

const RoleBased = ({ user,logOut }) => {
  console.log(user);
  return (
    <Fragment>
      {user.role === 'manager' && <ManagerPage user={user} logOut={logOut} />}
      {user.role === 'worker' && <EmployeePage user={user} logOut={logOut} />}
    </Fragment>
  );
};
export default RoleBased;
