/**
 * ************************************
 * @module  dB
 * @description Database file that will connect to the localhost postgreSQL
 * ************************************
//  */

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  // link making connection to databse
  // 'postgres://ceysbnlp:8OboVpyfMuX_QI8djNAKa4l2jPempgch@salt.db.elephantsql.com/ceysbnlp',
  'postgres://dhtzqjtz:lgTFMPAv7zt2IQXX6Vw2sxEwezL94l-5@batyr.db.elephantsql.com/dhtzqjtz',
  { logging: false }
);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log('error from db.js: ', err);
    console.log('i did not connect');
  });

db.types = require('./models/types.model.js')(sequelize, DataTypes);
const types = db.types;

db.locations = require('./models/locations.model.js')(sequelize, DataTypes);
const locations = db.locations;

db.employees = require('./models/employees.model.js')(
  sequelize,
  DataTypes,
  types,
  locations
);
const employees = db.employees;

db.logins = require('./models/logins.model.js')(
  sequelize,
  DataTypes,
  employees
);
const logins = db.logins;

db.timesheet = require('./models/timesheet.model.js')(
  sequelize,
  DataTypes,
  employees
);
const timesheet = db.timesheet;

// timesheet.create({
//   clock_in:"2023-02-04T10:54:42.303Z",
//   clock_out:"2023-02-04T19:54:42.303Z",
//   hours:7,
//   week:1,
//   emp_id:9
// })

// employees.hasMany(logins);
// logins.belongsTo(employees);
// types.findOrCreate({
//   where: { role_id: 1 },
//   defaults: {
//     employee_type: 'Manager',
//   },
// });
// types.findOrCreate({
//   where: { role_id: 2 },
//   defaults: {
//     employee_type: 'Worker',
//   },
// });
sequelize.sync({
  /*force: true,*/
});
console.log('All models were synchronized successfully.');

// DB RESET CODE
// ONLY RUN WHEN RESETTING MODELS
// running this code creates a new category of worker in Types
// sequelize.sync({ force: true });

module.exports = db;
