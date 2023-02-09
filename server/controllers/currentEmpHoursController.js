const db = require('../db');

const Timesheet = db.timesheet;
const getCurrentHours = async (req, res, next) => {
  const { emp_id } = req.body;

  try {
    const hours = await Timesheet.findAll({
      attributes: [
        'emp_id',
        [db.sequelize.fn('sum', db.sequelize.col('hours')), 'total'],
      ],
      group: ['emp_id'],
      raw: true,
    });
    console.log('hours', hours);
    //whole array of sum employee hours

    for (let i = 0; i < hours.length; i++) {
      if ((hours[i].emp_id = emp_id)) {
        res.locals.totals = hours[i];
      }
      console.log('res.locals from inside for loop (??): ', res.locals.totals);
      return next();
    }
  } catch {
    return next({
      log: 'This is an error in currentEmpHoursController',
      message: {
        err: `error`,
      },
    });
  }
};

module.exports = getCurrentHours;
