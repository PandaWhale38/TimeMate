const express = require('express');
const router = express.Router();
const toDoController = require('../controllers/todoController');

// get all to dos assigned TO an employee
// id parameter is employee id
router.get('/assignedto/:id', toDoController.getTodosFor, (req, res) => {
  res.status(200).json(res.locals.foundTodos);
});

// get all to dos assigned BY a manager
// id parameter is manager id
router.get('/assignedby/:id', toDoController.getTodosFrom, (req, res) => {
  res.status(200).json(res.locals.foundTodos);
});

// // when a post request is sent to /todo, add to array of todo objects {task:String, complete:Bool}
// router.post('/todo');

router.post('/add', toDoController.addTodo, (req, res) => {
  res.status(201).json(res.locals.newTodoData);
});

router.post('/toggle', toDoController.toggle, (req, res) => {
  res.status(202).send('Task status toggled');
});
// when a post request is sent to /todo, delete item from array of todo strings
router.post('/delete', toDoController.deleteTodo, (req, res) => {
  res.sendStatus(204);
});

module.exports = router;
