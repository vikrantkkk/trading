// Rate.js
const { DataTypes } = require('sequelize');

exports.createRateModel = (sequelize) => {
  const Rate = sequelize.define('Rate', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    buy_rate: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    sell_rate: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    tableName: 'rates', // Table name in the database
    underscored: true // Converts camelCase fields to snake_case in the database
  });

  return Rate;
}
