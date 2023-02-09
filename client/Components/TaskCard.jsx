import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

const TaskCard = ({ user, task, handleFetch }) => {
  const [taskComp, setTaskComp] = useState(task.task_complete);
  const {
    task_id,
    task_title,
    task_description,
    task_complete,
    assigned_to,
    assigned_by,
  } = task;

  const toggle = async () => {
    const response = await fetch('http://localhost:8080/todo/toggle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task_id }),
    });
    console.log(response);
    if (response.ok) {
      setTaskComp(!taskComp);
    }
  };

  const handleDelete = async () => {
    const response = await fetch('http://localhost:8080/todo/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task_id }),
    });
    console.log('response', response.ok);
    if (response.ok) {
      handleFetch();
    }
  };

  //control flow
  //if the card is completed, use background primary, if not, use backgorund secondary
  //if the emp role is a manager, display assigned to
  //if the emp role if is a employee, display assigned by
  //if the emp role is a employee, display mark as completed, else, no button

  //worker's case user.Success='Worker'; manager's case user.Success='Manager'

  return (
    <>
    <style type="text/css">
        {`
        .btn-complete {
          background-color: red;
          color: white;
        }

        .btn-incomplete {
          background-color: purple;
          color: white;
        }
        `}
      </style>
    <Col>
      <Card
        style={task_complete?{ backgroundColor: 'lightgreen',border: 'lightgreen', width: '18rem'}:{ backgroundColor: 'PeachPuff',border: 'PeachPuff', width: '18rem'}}
        className="mb-2 task-card"
      >
        <Card.Body>
          <Card.Title style={task_complete?{ color:'darkgreen'}:{ color:'coral'}}>{task_title}</Card.Title>
          <Card.Text>{task_description}</Card.Text>
          {user.Success === 'Worker' && (
            <Button
              style={task_complete?{ backgroundColor: 'darkgreen',border: 'darkgreen'}:{ backgroundColor: 'coral',border: 'coral'}}
              className="modify-task"
              onClick={() => {
                toggle();
                handleFetch();
              }}
              variant="primary"
            >
              {task_complete ? 'Mark as Incomplete' : 'Mark as Complete'}
            </Button>
          )}
          {user.Success === 'Manager' && (
            <Button
              className="modify-task"
              onClick={() => {
                handleDelete();
              }}
              variant="primary"
            >
              Delete this Task
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
    </>
  );
};

export default TaskCard;
