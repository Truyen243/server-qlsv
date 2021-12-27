'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Diem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Diem.belongsTo(models.SinhVien,{foreignKey:'sv_id',as:'diemsv'})
      Diem.belongsTo(models.MonHoc,{foreignKey:'mh_id',as:'diemmh'})
    }
  };
  Diem.init({
    sv_id: DataTypes.INTEGER,
    mh_id: DataTypes.INTEGER,
    diem10: DataTypes.INTEGER,
    diem30: DataTypes.INTEGER,
    diem60: DataTypes.INTEGER,
    diemtong: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'Diems',
    freezeTableName: true,
    modelName: 'Diem',
  });
  return Diem;
};