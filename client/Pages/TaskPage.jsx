import React, { Component, Fragment, useState, useEffect } from 'react';
import LoginButton from '../Components/LoginButton.jsx';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TaskCard from '../Components/TaskCard.jsx';
import Row from 'react-bootstrap/Row';


const TaskPage = ({ user }) => {
  const [tasks, setTask] = useState([{task_id:1,task_title:"hi",task_description:"2"},{},{}]);
  const [fetched,setFetched] = useState(false);
  //check if the role is manager (1) or (2)
  //fethc the assignedto or assigned from based on emp tol
  //display the tasks as cards ,
  // the page title would be the emp name; here are your assigned tasks, OR here are the tasks taht you assigned
  //task cards would take in user.emp_role as a prop

  useEffect(() => {
    handleFetch();
  }, [setTask]);

  const handleFetch = async () => {
    const url =
      user.Success === 'Worker'
        ? `http://localhost:8080/todo/assignedto/${user.emp_id}`
        : `http://localhost:8080/todo/assignedby/${user.emp_id}`;
    const response = await fetch(url);
    const json = await response.json();
    setTask(json);
    console.log('fetched tasks', tasks);
    setFetched(true);
  };

  console.log('fetched tasks', tasks);
//tasks.sort((a,b)=>a.task_complete-b.task_complete)
  return (
    <div className="taskContainer">
      <Row style={{ margin: 24 }} xs={1} md={2} className="g-4">
        {tasks.sort((a,b)=>a.task_complete-b.task_complete).map(task => <TaskCard key={task.task_id} user={user} task={task} handleFetch={handleFetch} />)}
        </Row>
    </div>
  );
};


export default TaskPage;
