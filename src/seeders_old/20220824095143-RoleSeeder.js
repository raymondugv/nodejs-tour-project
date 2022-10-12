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
					description: "Can see everything but can't delete",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Owner",
					description:
						"Can see only created item(s) and be able to delete",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "User",
					description: "Can do nothing",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Editor",
					description: "Only update status",
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
