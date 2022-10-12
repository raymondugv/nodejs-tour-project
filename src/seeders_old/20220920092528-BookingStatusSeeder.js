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
			"BookingStatuses",
			[
				{
					name: "New Booking",
					description: "New booking waiting for process",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Processing",
					description: "Booking is being processed",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Confirmed",
					description: "Booking is confirmed",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Cancelled",
					description: "Booking is cancelled",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Completed",
					description: "Booking is completed",
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
		await queryInterface.bulkDelete("BookingStatuses", null, {});
	},
};
