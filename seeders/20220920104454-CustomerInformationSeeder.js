"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('CustomerInformations', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert(
			"CustomerInformations",
			[
				{
					name: "Customer Name",
					email: "email@email-example.com",
					phone: "0123456789",
					gender: 1,
					username: "username",
					password: "password",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Customer Name",
					email: "email2@email-example.com",
					phone: "0123456781",
					gender: 1,
					username: "username2",
					password: "password",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Customer Name",
					email: "email3@email-example.com",
					phone: "0123456783",
					gender: 1,
					username: "username3",
					password: "password",
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
		 * await queryInterface.bulkDelete('CustomerInformations', null, {});
		 */
		await queryInterface.bulkDelete("CustomerInformations", null, {});
	},
};
