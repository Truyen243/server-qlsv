'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Diems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sv_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "SinhViens",
          key: "id"
        }
      },
      mh_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "MonHocs",
          key: "id"
        }
      },
      diem10: {
        type: Sequelize.INTEGER
      },
      diem30: {
        type: Sequelize.INTEGER
      },
      diem60: {
        type: Sequelize.INTEGER
      },
      diemtong: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Diems');
  }
};