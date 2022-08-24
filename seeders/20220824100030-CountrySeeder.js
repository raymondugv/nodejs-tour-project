"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('Countries', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert(
			"Countries",
			[
				{
					name: "Vietnam",
					createAt: new Date(),
					updateAt: new Date(),
				},
				{
					name: "Thailand",
					createAt: new Date(),
					updateAt: new Date(),
				},
				{
					name: "Cambodia",
					createAt: new Date(),
					updateAt: new Date(),
				},
				{
					name: "Laos",
					createAt: new Date(),
					updateAt: new Date(),
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
		 * await queryInterface.bulkDelete('Countries', null, {});
		 */
		await queryInterface.bulkDelete("Countries", null, {});
	},
};
