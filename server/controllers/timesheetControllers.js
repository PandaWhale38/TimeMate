const db = require('../db');

const Employees = db.employees;
const Timesheet = db.timesheet;

const clockIn = async (req, res, next) => {
  // const { emp_id } = req.body;

  console.log(req.body);
  const clockInData = {
    emp_id: res.locals.emp_id,
    clock_in: res.locals.timestamp,
    week: res.locals.week,
  };

  try {
    const empTimeSheets = await Timesheet.findAll({
      where: {
        emp_id: clockInData.emp_id
      }
    });
    // console.log('employee time sheets', empTimeSheets);
    for(let i = empTimeSheets.length-1; i >= 0; i--) {
      console.log('empTimeSheets[i].dataValues', empTimeSheets[i].dataValues);
      if(empTimeSheets[i].dataValues.clock_out === null){
        // console.log('Bad entry', ts.dataValues.entry_id);
        return next({
          status: 400,
          log: 'This is an error in timesheetController',
          message: {
            err: `Employee has timesheets without clock outs.`,
          },
        });
      }
    };
    // console.log('employee time sheets', empTimeSheets);
    // console.log('employee time sheets type', Array.isArray(empTimeSheets))


    const entry = await Timesheet.create(clockInData);

    res.locals.entry_id = entry.dataValues.entry_id;
    console.log("entry_id", entry.dataValues.entry_id)

    console.log(entry);
    if (!entry) {
      return next({
        status: 400,
        log: 'This is an error in timesheetController',
        message: {
          err: `Employee has timesheets without clock outs.`,
        },
      });
    }

    return next();
  } catch (err) {
    return next({
      log: 'This is an error in clockin in timesheetController',
      message: {
        err: `${err}`,
      },
    });
  }
};

const clockOut = async (req, res, next) => {
  const entry_id = req.body.entry_id;
  console.log('entry_id', entry_id);
  if(!entry_id){
    return next({
      status: 400,
      log: 'This is an error in clockout in timesheetController',
      message: {
        err: `Invalid entry_id`,
      },
    });
  }
  try {
    // console.log('REQ.BODY: ', req.body);
    // console.log(entry_id);
    //   const clockOutData = {
    //     emp_id,
    //     clock_out, //// <-----
    //     entry_id,
    //   };

    /// entry id  clcok in clockout employeeid day week
    //  1         8:00 am   null    2          1 3

    // 1     8           5        2 1  3

    const clockIn = await Timesheet.findOne({
      where: {
        entry_id: entry_id,
      },
    });
    if(!clockIn){
      return next({
        status: 400,
        log: 'This is an error in clockout in timesheetController',
        message: {
          err: `Entry_id for clock out does not have a matching row`,
        },
      })
    }
    if(clockIn.dataValues.clock_out !== null){
      return next({
        status: 400,
        log: 'This is an error in clockout in timesheetController',
        message: {
          err: `Entry_id already has a clock out`,
        },
      })
    }

    console.log('timesheet for clockout:', clockIn);


    const timeIn = new Date(clockIn.dataValues.clock_in);

    const timeOut = new Date(res.locals.timestamp);

    function timeDifference(date1, date2) {
      let diff = (date2.getTime() - date1.getTime()) / 1000;
      diff /= 3600;
      return Math.abs(Math.round(diff));
    }

    const hours = timeDifference(timeIn, timeOut);


    const entry = await Timesheet.update(
      { clock_out: timeOut, hours },
      {
        where: {
          entry_id: entry_id,
        },
      }
    );

    if (!entry) {
      throw new Error();
    }

    console.log(entry);
    res.locals.entry = entry;

    return next();
  } catch (error) {
    return next({
      log: 'This is an error in clockout in timesheetController',
      message: {
        err: `${error}`,
      },
    })
    
  }

};

module.exports = {
  clockIn: clockIn,
  clockOut: clockOut,
};
