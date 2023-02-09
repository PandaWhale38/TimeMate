import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const CreateTodoForm = ({assigned_to,setTaskSubmitted}) => {
  const [show, setShow] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleSubmit = async () => {
    console.log('task submitted', taskName, taskDescription);
    const response = await fetch('/todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({taskName,taskDescription}),
    });
    if (response.ok) {
      setTaskSubmitted(1);
    } else {
      setTaskSubmitted(-1);
    }
  };

  return (
    <>

      <Button className='add-todo' variant="primary" onClick={handleShow}>
        +
      </Button>

      <Modal  show={show} onHide={handleClose}>
        <Modal.Header className='todo-form' closeButton>
          <Modal.Title >Create a new Task</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Form >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Task title ..."
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Task Description</Form.Label>
              <Form.Control as="textarea" value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="What does this employee need to complete?"
                rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className='add-todo' variant="primary" onClick={() => {handleSubmit(), handleClose()}} >
            Create Task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateTodoForm;