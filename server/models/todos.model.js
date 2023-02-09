module.exports = (sequelize, DataTypes, employees) => {
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
        defaultValue: false,
      },
      assigned_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          // This is a reference to another model
          model: employees,
          // This is the column name of the referenced model
          key: 'emp_id',
        },
      },
      assigned_to: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
