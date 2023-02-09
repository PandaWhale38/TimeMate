import React, { Component, Fragment, useState, useEffect } from 'react';
import LoginButton from '../Components/LoginButton.jsx';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TaskCard from '../Components/TaskCard.jsx';

const TaskPage = ({ user }) => {
  [tasks, setTask] = useState(null);
  //check if the role is manager (1) or (2)
  //fethc the assignedto or assigned from based on emp tol
  //display the tasks as cards ,
  // the page title would be the emp name; here are your assigned tasks, OR here are the tasks taht you assigned
  //task cards would take in user.emp_role as a prop
  useEffect(() => {
    handleFetch();
  }, [tasks]);

  const handleFetch = async () => {
    const url =
      user.Success === 1
        ? `http://localhost:8080/todo/assignedto/${user.emp_id}`
        : `http://localhost:8080/todo/assignedby/${user.emp_id}`;
    const response = await fetch(url);
    const json = await response.json();
    setTask(json);
  };

  return (
    <div className="taskContainer">
      {tasks.map((task) => {
        <TaskCard user={user} task={task} />;
      })}
    </div>
  );
};

export default TaskPage;
