module.exports = (sequelize, DataTypes) => {
  const Todos = sequelize.define(
    'todos',
    {
      task_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      task_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      task_description: {
        type: DataTypes.STRING,
      },
      task_complete: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
      // emp_role === 1 is manager; right now, anything else is employee (see employees.controller.js at line 109)
      assigned_by: {
        type: DataTypes.INTEGER,
        references: {
          // This is a reference to another model
          model: employees,
          // This is the column name of the referenced model
          key: 'emp_id',
        },
      },
      assigned_to: {
        type: DataTypes.INTEGER,
        references: {
          // This is a reference to another model
          model: employees,
          // This is the column name of the referenced model
          key: 'emp_id',
        },
      },
    },
    { timestamps: true }
  );
  return Todos;
};
