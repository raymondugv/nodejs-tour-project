"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('Permission', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert(
			"Permissions",
			[
				{
					key: "create_users",
					table_name: "users",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					key: "read_users",
					table_name: "users",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					key: "update_users",
					table_name: "users",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					key: "delete_users",
					table_name: "users",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					key: "create_roles",
					table_name: "roles",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					key: "read_roles",
					table_name: "roles",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					key: "update_roles",
					table_name: "roles",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					key: "delete_roles",
					table_name: "roles",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					key: "create_cities",
					table_name: "cities",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					key: "read_cities",
					table_name: "cities",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					key: "update_cities",
					table_name: "cities",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					key: "delete_cities",
					table_name: "cities",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					key: "create_countries",
					table_name: "countries",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					key: "read_countries",
					table_name: "countries",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					key: "update_countries",
					table_name: "countries",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					key: "delete_countries",
					table_name: "countries",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					key: "create_categories",
					table_name: "categories",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					key: "read_categories",
					table_name: "categories",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					key: "update_categories",
					table_name: "categories",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					key: "delete_categories",
					table_name: "categories",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					key: "create_tours",
					table_name: "tours",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					key: "read_tours",
					table_name: "tours",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					key: "update_tours",
					table_name: "tours",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					key: "delete_tours",
					table_name: "tours",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					key: "active_tours",
					table_name: "tours",
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
		 * await queryInterface.bulkDelete('Permission', null, {});
		 */
		await queryInterface.bulkDelete("Permissions", null, {});
	},
};
