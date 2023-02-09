const { employees } = require('../db');
const db = require('../db');

const todoController = {};

todoController.getTodos = async (req, res, next) => {
  // get todo list by employee id
  console.log(req.body.emp_id);
  try {
    const employee = await employees.findOne({
      where: {
        emp_id: req.body.emp_id,
      },
    });
    console.log(employee.to_do);
    // array of objects {task: String, complete: Boolean}
    res.locals.toDoList = employee.to_do;
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

todoController.addTodo = async (req, res, next) => {
  // add a todo to employee's list
  // {task: String, complete: Boolean}
  console.log(req.body.emp_id);
  console.log(req.body.new_task);
  try {
    const employee = await employees.findOne({
      where: {
        emp_id: req.body.emp_id,
      },
    });
    console.log(employee.to_do);
    // array of objects
    const newTodoList = employee.to_do;
    newTodoList.push(req.body.new_task);
    await employee.update({
      to_do: newTodoList,
    });
    res.locals.todoList = newTodoList;
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
