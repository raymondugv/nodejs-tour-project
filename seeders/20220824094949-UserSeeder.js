"use strict";
const bcrypt = require("bcryptjs");
const { ROLE } = require("../config/data");

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
					email: "admin@admin.com",
					password: await bcrypt.hash("admin", salt),
					role_id: ROLE.ADMIN,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Owner User",
					email: "owner@admin.com",
					password: await bcrypt.hash("owner", salt),
					role_id: ROLE.OWNER,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "User",
					email: "user@admin.com",
					password: await bcrypt.hash("user", salt),
					role_id: ROLE.USER,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Editor",
					email: "editor@admin.com",
					password: await bcrypt.hash("editor", salt),
					role_id: ROLE.EDITOR,
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
