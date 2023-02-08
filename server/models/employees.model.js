//user model

module.exports = (sequelize, DataTypes, types) => {
  const Employees = sequelize.define(
    'all_employees',
    {
      emp_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // emp_role === 1 is manager; right now, anything else is employee (see employees.controller.js at line 109)
      emp_role: {
        type: DataTypes.INTEGER,
        references: {
          // This is a reference to another model
          model: types,
          // This is the column name of the referenced model
          key: 'role_id',
        },
      },
      // adding hourly wage for front-end dashboard calculations
      hourly_wage: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
      },
      // adding worker task list -- will be a list of objects representing tasks
      to_do: {
        type: DataTypes.ARRAY(DataTypes.JSON),
      },
    },
    { timestamps: true }
  );
  return Employees;
};
