const { DataTypes } = require('sequelize');

exports.createUserModel = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    }
  }, {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    tableName: 'users', // Table name in the database
    underscored: true // Converts camelCase fields to snake_case in the database
  });

  return User;
}
