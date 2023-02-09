const db = require('../db');
const Logins = db.logins;

// delete only user login; timesheet and other employee data should remain in the db for later reference
const deactivateUser = async (req, res, next) => {
  console.log('hello from deleteuser: ', req.body);
  try {
    await Logins.destroy({
      where: {
        user_id: req.body.emp_id,
      },
    });
    next();
  } catch (err) {
    console.log(err);
    next({ err });
  }
};

module.exports = deactivateUser;
