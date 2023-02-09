import React, { Component, useState } from 'react';
import EmployeeRow from '../Components/EmployeeRow.jsx';
import deleteButton from '../Components/deleteButton.jsx';
import LogOutButton from '../Components/logOutButton.jsx';
import PieChart from '../Components/PieChart.jsx';

const ManagerPage = ({ logOut, user }) => {
  const [taskSubmitted, setTaskSubmitted] = useState(0);
  const [dataArr, setDataArr] = useState([]);
  const filename = 'employeeData.csv';

  const handleDownload = (array, filename) => {
    console.log('dataArr', dataArr);
    let csv = convertArrayToCSV(array);
    if (csv == null) return;

    filename = filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    let data = encodeURI(csv);

    let link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
  };

  function convertArrayToCSV(array) {
    let str = '';
    let keys = Object.keys(array[0]);

    str += keys.join(',') + '\n';

    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let j = 0; j < keys.length; j++) {
        if (line != '') line += ',';

        line += array[i][keys[j]];
      }

      str += line + '\n';
    }

    return str;
  }

  const location =
    user.emp_location === 1
      ? 'Knoxville'
      : user.emp_location === 2
      ? 'Boston'
      : 'Ecuador';
  return (
    <section id="managerPageOutterBox">
      {taskSubmitted === 1 && (
        <div className="alert alert-success">Task created!</div>
      )}
      {taskSubmitted === -1 && (
        <div className="alert alert-danger">Task creation failed!</div>
      )}
      <h2 id="managerTimeMate">{`Hello ${user.first_name}!`}</h2>
      <h3 id="manageLocation">{location}</h3>
      <button
        className="navbutton"
        onClick={() => handleDownload(dataArr, filename)}
      >
        Download CSV
      </button>
      {/* <table id='employeeTable'> */}
      {/* <tr>
            <th id='employeeNameTable'>Employee</th>
            <th id='hoursWorkedTable'>Hours Worked</th>
            <th id='employeeIdTable'>Employee ID</th>
          </tr> */}

      {/* we want to fill this table with rows from our database, containing
          the information of the employees COME BACK @SHENG  */}
      <EmployeeRow
        setDataArr={setDataArr}
        user={user}
        setTaskSubmitted={setTaskSubmitted}
      />
      {/* </table> */}
      {/* <deleteButton /> */}

      <section
        className="d-flex flex-column align-items-center"
        id="managerLogOut"
      >
        <PieChart user={user} />
        <LogOutButton logOut={logOut} />
      </section>
    </section>
  );
};

export default ManagerPage;
