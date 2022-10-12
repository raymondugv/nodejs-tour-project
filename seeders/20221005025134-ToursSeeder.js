"use strict";
const { faker } = require("@faker-js/faker");
const exchange = require("@config/currencyTransfer");

const tours = [];
const createRandomTours = () => {
	return {
		title: faker.commerce.productName(),
		slug: faker.internet.domainWord(),
		description: faker.commerce.productDescription(),
		image: faker.image.imageUrl(),
		price: faker.commerce.price(800000, 99999999, 0),
		departure_date: faker.date.birthdate({
			min: 2022,
			max: 2023,
			mode: "year",
		}),
		departure: 1,
		arrival: 2,
		status: 0,
		owner: 1,
		createdAt: new Date(),
		updatedAt: new Date(),
	};
};

for (let i = 0; i < 40; i++) {
	tours.push(createRandomTours());
}

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('Tours', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		for (let i = 0; i < 50; i++) {
			await queryInterface.bulkInsert("Tours", tours, {});
		}
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('Tours', null, {});
		 */
		await queryInterface.bulkDelete("Tours", null, {});
	},
};
