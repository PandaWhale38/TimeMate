const db = require('../db');

const Locations = db.locations;

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
const getData = async (req, res, next) => {
  console.log('hitting get location data');
  try {
    const { location_id } = req.body;
    console.log(location_id);
    const locationData = await Locations.findOne({
      where: { location_id },
    });
    console.log('location data:', locationData);
    const employeeTable = res.locals.employee;
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
};
module.exports = getLocationData;
