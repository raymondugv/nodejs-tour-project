"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert(
			"PaymentStatuses",
			[
				{
					name: "Waiting for payment",
					description: "Waiting for payment",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Paid",
					description: "Payment is paid",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Refunded",
					description: "Payment is refunded",
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
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete("PaymentStatuses", null, {});
	},
};
