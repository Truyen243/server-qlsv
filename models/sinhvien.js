'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SinhVien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SinhVien.belongsTo(models.Lop, {foreignKey: 'lop_id', as: 'sinhviens'});
      SinhVien.belongsToMany(models.MonHoc,{through:'Diems',foreignKey:'sv_id',as:'sinhvienmh'});
    }
  };
  SinhVien.init({
    name: DataTypes.STRING,
    uid: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    lop_id: DataTypes.INTEGER,
    date: DataTypes.STRING,
    phone:DataTypes.STRING,
    sex:DataTypes.STRING
  }, {
    sequelize,
    tableName: 'SinhViens',
    freezeTableName: true,
    modelName: 'SinhVien',
  });
  return SinhVien;
};