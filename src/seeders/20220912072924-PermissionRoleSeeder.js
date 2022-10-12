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
			"PermissionRoles",
			[
				{
					permission_id: 1,
					role_id: 1,
				},
				{
					permission_id: 2,
					role_id: 1,
				},
				{
					permission_id: 3,
					role_id: 1,
				},
				{
					permission_id: 4,
					role_id: 1,
				},
				{
					permission_id: 5,
					role_id: 1,
				},
				{
					permission_id: 6,
					role_id: 1,
				},
				{
					permission_id: 7,
					role_id: 1,
				},
				{
					permission_id: 8,
					role_id: 1,
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
		await queryInterface.bulkDelete("PermissionRoles", null, {});
	},
};
