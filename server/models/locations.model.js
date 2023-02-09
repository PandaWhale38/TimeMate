//locations model
module.exports = (sequelize, DataTypes, employees) => {
  const Locations = sequelize.define(
    'locations',
    {
      // unique numerical id for location
      location_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      // location name
      location_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // made up numbers for data viz but it COULD be real
      total_budget: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      total_revenue: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },

    { timestamps: true }
  );
  return Locations;
};
