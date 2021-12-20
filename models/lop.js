'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lop.hasMany(models.SinhVien, {foreignKey: 'lop_id', as: 'sinhviens'});
      Lop.belongsTo(models.Khoa,{foreignKey:'khoa_id',as:'lops'})
    }
  };
  Lop.init({
    ten: DataTypes.STRING,
    khoa_id: DataTypes.INTEGER,
    malop: DataTypes.STRING,
  }, {
    sequelize,
    tableName: 'Lops',
    modelName: 'Lop',
  });
  return Lop;
};