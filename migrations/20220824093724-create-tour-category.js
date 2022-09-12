"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("ToursCategories", {
			category_id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			tour_id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("ToursCategories");
	},
};
