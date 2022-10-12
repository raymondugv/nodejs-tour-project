"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('Categories', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert(
			"Categories",
			[
				{
					name: "Domestic Tour",
					slug: "domestic-tour",
					description: "This is domestic tour",
					parent_id: null,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "International Tour",
					slug: "international-tour",
					description: "This is international tour",
					parent_id: null,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Summer Tour",
					slug: "summer-tour",
					description: "This is summer tour",
					parent_id: null,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Autumn Tour",
					slug: "autumn-tour",
					description: "This is autumn tour",
					parent_id: null,
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
		 * await queryInterface.bulkDelete('Categories', null, {});
		 */
		await queryInterface.bulkDelete("Categories", null, {});
	},
};
