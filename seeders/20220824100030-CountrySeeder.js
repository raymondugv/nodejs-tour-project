"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('Countries', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert(
			"Countries",
			[
				{
					name: "Vietnam",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Thailand",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Cambodia",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Laos",
					createdAt: new Date(),
					updatedAt: new Date(),
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
		 * await queryInterface.bulkDelete('Countries', null, {});
		 */
		await queryInterface.bulkDelete("Countries", null, {});
	},
};
