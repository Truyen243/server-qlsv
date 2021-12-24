'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MonHoc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MonHoc.belongsToMany(models.SinhVien,{through:'Diems',foreignKey:'mh_id',as:'monhocs'})
    }
  };
  MonHoc.init({
    ten: DataTypes.STRING,
    hesodiem: DataTypes.INTEGER,
    sotiet: DataTypes.INTEGER,
    mamonhoc: DataTypes.STRING,

  }, {
    sequelize,
    tableName: 'MonHocs',
    freezeTableName: true,
    modelName: 'MonHoc',
  });
  return MonHoc;
};