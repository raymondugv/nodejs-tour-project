"use strict";
const { BOOKING_STATUS, PAYMENT_STATUS } = require("../config/data");

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("BookingInformations", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			booking_number: Sequelize.STRING,
			tour_id: {
				type: Sequelize.INTEGER,
			},
			customer_id: {
				type: Sequelize.INTEGER,
			},
			number_of_pax: {
				type: Sequelize.INTEGER,
			},
			departure_date: {
				type: Sequelize.DATEONLY,
			},
			booking_status: {
				type: Sequelize.ENUM,
				values: [
					BOOKING_STATUS.NEW_BOOKING,
					BOOKING_STATUS.PROCESSING,
					BOOKING_STATUS.CONFIRMED,
					BOOKING_STATUS.CANCELLED,
					BOOKING_STATUS.COMPLETED,
				],
				defaultValue: BOOKING_STATUS.NEW_BOOKING,
			},
			payment_status: {
				type: Sequelize.ENUM,
				values: [
					PAYMENT_STATUS.WAITING_FOR_PAYMENT,
					PAYMENT_STATUS.PAID,
					PAYMENT_STATUS.REFUNDED,
				],
				defaultValue: PAYMENT_STATUS.WAITING_FOR_PAYMENT,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("BookingInformations");
	},
};
