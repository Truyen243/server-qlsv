'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Khoa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Khoa.hasMany(models.Lop,{foreignKey:'khoa_id',as:'lops'});
    }
  };
  Khoa.init({
    ten: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'Khoas',
    modelName: 'Khoa',
  });
  return Khoa;
};