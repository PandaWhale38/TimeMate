const express = require('express');
const router = express.Router();
const toDoController = require('../controllers/todoController');

// when a get request is sent to /todo, return array of todo strings
router.get('/', toDoController.getTodos, (req, res) => {
  res.status(200).json(res.body.toDoList);
});

// // when a post request is sent to /todo, add to array of todo objects {task:String, complete:Bool}
// router.post('/todo');
router.post('/', toDoController.addTodo, (req, res) => {
  res.status(201).json(res.locals.newTodoList);
});

// router.post()
// // when a post request is sent to /todo, delete item from array of todo strings
// router.post('/todo/delete');

module.exports = router;
