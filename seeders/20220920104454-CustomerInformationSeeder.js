"use strict";

const {faker} = require("@faker-js/faker");
const bcrypt = require("bcryptjs");
const salt = 10;

const customers = [
  {
    name : "Customer Name",
    email : "email@email-example.com",
    phone : "0123456789",
    gender : 1,
    username : "username",
    password : bcrypt.hashSync("password", salt),
    birthday : faker.date.birthdate({min : 1940, max : 2022, mode : "year"}),
    createdAt : new Date(),
    updatedAt : new Date(),
  },
];

const createRandomCustomers = () => {
  let firstName = faker.name.firstName(), lastName = faker.name.lastName();
  return {
    name : `${firstName} ${lastName}`,
    email : faker.internet.email(firstName.toLowerCase(),
                                 lastName.toLowerCase(), "nodejs-tour.test"),
    phone : 0 + faker.random.numeric(9),
    gender : 1,
    username : faker.internet.userName(firstName.toLowerCase(),
                                       lastName.toLowerCase()),
    birthday : faker.date.birthdate({min : 1940, max : 2000, mode : "year"}),
    password : bcrypt.hashSync("password", salt),
    createdAt : new Date(),
    updatedAt : new Date(),
  };
};

for (let i = 0; i < 30; i++) {
  customers.push(createRandomCustomers());
}

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('CustomerInformations', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("CustomerInformations", customers, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('CustomerInformations', null, {});
     */
    await queryInterface.bulkDelete("CustomerInformations", null, {});
  },
};
