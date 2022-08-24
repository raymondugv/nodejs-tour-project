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
				},
				{
					name: "Moderator",
					description: "Can do some stuff",
				},
				{
					name: "User",
					description: "Can do nothing",
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
