"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('Roles', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert(
			"Roles",
			[
				{
					name: "Admininstrator",
					description: "Can do everything",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Moderator",
					description: "Can do some stuff",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "User",
					description: "Can do nothing",
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
		 * await queryInterface.bulkDelete('Roles', null, {});
		 */
		await queryInterface.bulkDelete("Roles", null, {});
	},
};
