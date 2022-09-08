"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert(
			"Cities",
			[
				{
					name: "Ho Chi Minh",
					country: 1,
					slug: "ho-chi-minh",
					description: "This is ho chi minh city",
				},
				{
					name: "Ha Noi",
					country: 1,
					slug: "ha-noi",
					description: "This is ha noi city",
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete("Countries", null, {});
	},
};
