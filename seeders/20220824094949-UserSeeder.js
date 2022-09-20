"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
	async up(queryInterface, Sequelize) {
		const salt = await bcrypt.genSalt(10);
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('Users', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert(
			"Users",
			[
				{
					name: "Admin User",
					email: "admin@email.com",
					password: await bcrypt.hash("admin", salt),
					role_id: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Owner User",
					email: "owner@email.com",
					password: await bcrypt.hash("owner", salt),
					role_id: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "User",
					email: "user@email.com",
					password: await bcrypt.hash("user", salt),
					role_id: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Editor",
					email: "editor@email.com",
					password: await bcrypt.hash("editor", salt),
					role_id: 4,
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
		 * await queryInterface.bulkDelete('Users', null, {});
		 */
		await queryInterface.bulkDelete("Users", null, {});
	},
};
