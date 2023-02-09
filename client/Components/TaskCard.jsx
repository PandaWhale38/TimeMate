import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const TaskCard = ({ user, task }) => {
  console.log(task);
  const { task_name, task_description, assigned_to, assigned_by } = task;
  
  return (
    <Card>
      <Card.Body>
        <Card.Title>{task_name}</Card.Title>
        <Card.Text>
          {task_description}
        </Card.Text>
        <Button variant="primary">Mark As Completed</Button>
      </Card.Body>
    </Card>
  )
}

export default TaskCard;