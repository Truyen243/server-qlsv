'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Admin.init({
    ten: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
    code: DataTypes.STRING,
    verify:DataTypes.BOOLEAN
  }, {
    sequelize,
    tableName: 'Admins',
    freezeTableName: true,
    modelName: 'Admin',
  });
  return Admin;
};