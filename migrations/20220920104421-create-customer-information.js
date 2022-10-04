"use strict";
const {GENDER} = require("../config/data");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CustomerInformations", {
      id : {
        allowNull : false,
        autoIncrement : true,
        primaryKey : true,
        type : Sequelize.INTEGER,
      },
      username : {
        type : Sequelize.STRING,
      },
      name : {
        type : Sequelize.STRING,
      },
      email : {
        type : Sequelize.STRING,
      },
      password : {
        type : Sequelize.STRING,
      },
      phone : {
        type : Sequelize.STRING,
      },
      birthday : {
        type : Sequelize.DATEONLY,
      },
      avatar : {
        type : Sequelize.STRING,
      },
      gender : {
        type : Sequelize.ENUM,
        values : [ GENDER.MALE, GENDER.FEMALE ],
        defaultValue : "0",
      },
      createdAt : {
        allowNull : false,
        type : Sequelize.DATE,
      },
      updatedAt : {
        allowNull : false,
        type : Sequelize.DATE,
      },
    });
  },
  async down(
      queryInterface,
      Sequelize) { await queryInterface.dropTable("CustomerInformations"); },
};
