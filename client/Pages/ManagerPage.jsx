import React, { Component, useState } from 'react';
import EmployeeRow from '../Components/EmployeeRow.jsx';
import deleteButton from '../Components/deleteButton.jsx';
import LogOutButton from '../Components/logOutButton.jsx';

const ManagerPage = ({ logOut, user }) => {
  const [taskSubmitted, setTaskSubmitted] = useState(0);

  return (
    <section id="managerPageOutterBox">
      {taskSubmitted === 1 && (
        <div className="alert alert-success">Task created!</div>
      )}
      {taskSubmitted === -1 && (
        <div className="alert alert-danger">Task creation failed!</div>
      )}
      <div id="managerTimeMate">TimeMate</div>
      {/* <table id='employeeTable'> */}
      {/* <tr>
            <th id='employeeNameTable'>Employee</th>
            <th id='hoursWorkedTable'>Hours Worked</th>
            <th id='employeeIdTable'>Employee ID</th>
          </tr> */}

      {/* we want to fill this table with rows from our database, containing
          the information of the employees COME BACK @SHENG  */}
      <EmployeeRow user={user} setTaskSubmitted={setTaskSubmitted} />
      {/* </table> */}
      {/* <deleteButton /> */}
      <section id="managerLogOut">
        <LogOutButton logOut={logOut} />
      </section>
    </section>
  );
};

export default ManagerPage;
