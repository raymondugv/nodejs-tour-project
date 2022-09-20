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
			"BookingStatus",
			[
				{
					name: "New Booking",
					description: "New booking waiting for process",
				},
				{
					name: "Processing",
					description: "Booking is being processed",
				},
				{
					name: "Confirmed",
					description: "Booking is confirmed",
				},
				{
					name: "Cancelled",
					description: "Booking is cancelled",
				},
				{
					name: "Completed",
					description: "Booking is completed",
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
		await queryInterface.bulkDelete("BookingStatus", null, {});
	},
};
