"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("PermissionRoles", {
			permission_id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			role_id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("PermissionRoles");
	},
};
