const { employees } = require('../db');
const db = require('../db');
const Todos = db.todos;
const todoController = {};

todoController.getTodosFor = async (req, res, next) => {
  // get todo list for employee with given id
  console.log('employee id: ', req.params.id);
  try {
    const foundTodos = await Todos.findAll({
      where: { assigned_to: req.params.id },
    });
    console.log('todos for employee: ', JSON.stringify(foundTodos));
    res.locals.foundTodos = foundTodos;
    return next();
  } catch (error) {
    return next({
      log: 'This is an error in getToDos',
      message: {
        err: `${error}`,
      },
    });
  }
};

todoController.getTodosFrom = async (req, res, next) => {
  //get list of todos assigned by employee (manager) with given id

  console.log('employee id: ', req.params.id);
  try {
    // find all todos assigned BY that employee
    const foundTodos = await Todos.findAll({
      where: { assigned_by: req.params.id },
    });
    console.log('todos from manager: ', JSON.stringify(foundTodos));
    res.locals.foundTodos = foundTodos;
    return next();
  } catch (error) {
    return next({
      log: 'This is an error in getToDos',
      message: {
        err: `${error}`,
      },
    });
  }
};

todoController.deleteTodo = async (req, res, next) => {
  // delete a todo by its id
  console.log(req.body);
  try {
    await Todos.destroy({
      where: { task_id: req.body.task_id },
    });
    next();
  } catch (err) {
    next({ err });
  }
};

todoController.addTodo = async (req, res, next) => {
  // add a todo to employee's list
  console.log(req.body);
  try {
    const { task_title, task_description, assigned_by, assigned_to } = req.body;
    const newTodoData = {
      task_title,
      task_description,
      assigned_by,
      assigned_to,
    };
    const todo = await Todos.create(newTodoData);
    res.locals.newTodoData = todo;
    return next();
  } catch (error) {
    return next({
      log: 'This is an error in addToDo',
      message: {
        err: `${error}`,
      },
    });
  }
};

module.exports = todoController;
