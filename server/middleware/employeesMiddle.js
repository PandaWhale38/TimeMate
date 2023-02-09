const { sequelize } = require('../db');
const db = require('../db');
const employees = db.employees;
const timesheet = db.timesheet;

const getAll = (req, res, next) => {
  // if we wanted to see only employees from one location,
  // query to get array of employee ids from that location
  // add WHERE clause to the below query
  // if(!req.location_id){
  //   return next({err})
  // }
  const { emp_location } = req.body;
  console.log('empl_location is received on query', emp_location);

  sequelize
    .query(`SELECT  ts.emp_id, ae.first_name, ae.last_name, ae.hourly_wage, SUM(hours) as hours_worked 
    FROM timesheets as ts 
    INNER JOIN all_employees AS ae ON ts.emp_id=ae.emp_id
    WHERE ae.emp_location = ${emp_location}
    GROUP BY ae.first_name, ts.emp_id, ae.last_name, ae.hourly_wage;`)
    
    .then((response) => {
      res.locals.employees = response[0];
      next();
    })
    .catch((error) => {
      console.log(error);
    });
};

const employeesMiddle = {
  getAll: getAll,
};
module.exports = employeesMiddle;
/*
const Sequelize = require("sequelize");
const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql"
});

const Timesheets = sequelize.define("timesheets", {
  emp_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  hours: {
    type: Sequelize.INTEGER
  }
});

const AllEmployees = sequelize.define("all_employees", {
  emp_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  first_name: {
    type: Sequelize.STRING
  },
  last_name: {
    type: Sequelize.STRING
  }
});

Timesheets.belongsTo(AllEmployees, {
  foreignKey: "emp_id",
  targetKey: "emp_id"
});

sequelize
  .query(
    "SELECT ts.emp_id, ae.first_name, ae.last_name, SUM(hours) as hours_worked 
    FROM timesheets as ts INNER JOIN all_employees AS ae ON ts.emp_id=ae.emp_id GROUP BY ae.first_name, ts.emp_id, ae.last_name",
    { type: sequelize.QueryTypes.SELECT }
  )
  .then(result => {
    console.log(result);
  });
*/
