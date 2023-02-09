const db = require('../db');

const Locations = db.locations;
const Employees = db.employees;

/**
     * 
     *     {
        "emp_id": 4,
        "first_name": "test4",
        "last_name": "test",
        "hourly_wage": "20.00",
        "hours_worked": "30"
    },
     */

const getEmployeeData = async (req, res, next) => {
  console.log('getting employee data by id');
  try {
    const foundEmployee = await Employees.findOne({
      where: { emp_id: req.params.id },
    });
    console.log(foundEmployee.dataValues);
    res.locals.employeeData = foundEmployee.dataValues;
    return next();
  } catch (err) {
    console.log(err);
    next({ err });
  }
};

const getData = async (req, res, next) => {
  console.log('hitting get location data');
  try {
    const { emp_location } = req.body;
    console.log(emp_location);
    console.log('reslocalsemplocation', res.locals.emp_location);
    if (emp_location < 1)
      return next({
        log: 'This is an error in dataController',
        message: {
          err: `Invalid location.`,
        },
      });
    const locationData = await Locations.findOne({
      where: { location_id: emp_location },
    });
    if (!locationData)
      return next({
        log: 'This is an error in dataController',
        message: {
          err: `Error getting location data.`,
        },
      });
    console.log('location data:', locationData);
    const employeeTable = res.locals.employees;
    console.log('employeeTable', employeeTable);
    let totalSpent = 0;
    for (const employee of employeeTable) {
      let employeeCost = employee.hourly_wage * employee.hours_worked;
      totalSpent += employeeCost;
    }
    console.log('The total spent in workers is', totalSpent);

    res.locals.locationData = {
      budget: locationData.total_budget,
      spent: totalSpent,
      revenue: locationData.total_revenue,
    };
    console.log('I AM HERE');
    return next();
  } catch (error) {
    return next({
      log: 'This is an error in dataController',
      message: {
        err: `${error}`,
      },
    });
  }
};
const getLocationData = {
  getData: getData,
  getEmployeeData: getEmployeeData,
};
module.exports = getLocationData;
