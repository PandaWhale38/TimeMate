import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const CreateTodoForm = ({ assigned_by, assigned_to, setTaskSubmitted }) => {
  const [show, setShow] = useState(false);
  const [task_title, setTaskName] = useState('');
  const [task_description, setTaskDescription] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    console.log('task submitted', task_title, task_description);
    const response = await fetch('http://localhost:8080/todo/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        task_title,
        task_description,
        assigned_to,
        assigned_by,
      }),
    });
    if (response.ok) {
      setTaskSubmitted(1);
    } else {
      setTaskSubmitted(-1);
    }
  };

  return (
    <>
      <Button className="add-todo" variant="primary" onClick={handleShow}>
        +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="todo-form" closeButton>
          <Modal.Title>Create a new Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Task title ..."
                value={task_title}
                onChange={(e) => setTaskName(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                as="textarea"
                value={task_description}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="What does this employee need to complete?"
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            className="add-todo"
            variant="primary"
            onClick={() => {
              handleSubmit(), handleClose();
            }}
          >
            Create Task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateTodoForm;
