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
			"PaymentStatus",
			[
				{
					name: "Waiting for payment",
					description: "Waiting for payment",
				},
				{
					name: "Paid",
					description: "Payment is paid",
				},
				{
					name: "Refunded",
					description: "Payment is refunded",
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
		await queryInterface.bulkDelete("PaymentStatus", null, {});
	},
};
