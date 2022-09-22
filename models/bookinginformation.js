"use strict";
const { Model } = require("sequelize");
const booking_code = require("../config/booking_reference");

module.exports = (sequelize, DataTypes) => {
	class BookingInformation extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.BookingStatus, {
				as: "booking",
				foreignKey: "booking_status",
				onUpdate: "NO ACTION",
				onDelete: "NO ACTION",
				constraints: false,
			});

			this.belongsTo(models.PaymentStatus, {
				as: "payment",
				foreignKey: "payment_status",
				onUpdate: "NO ACTION",
				onDelete: "NO ACTION",
				constraints: false,
			});

			this.belongsTo(models.CustomerInformation, {
				as: "customer",
				foreignKey: "customer_id",
				onUpdate: "NO ACTION",
				onDelete: "NO ACTION",
				constraints: false,
			});

			this.belongsTo(models.Tour, {
				as: "tour",
				foreignKey: "tour_id",
				onUpdate: "NO ACTION",
				onDelete: "NO ACTION",
				constraints: false,
			});

			this.belongsTo(models.User, {
				as: "ownerInfo",
				foreignKey: "owner",
				onUpdate: "NO ACTION",
				onDelete: "NO ACTION",
				constraints: false,
			});
		}
	}
	BookingInformation.init(
		{
			booking_number: DataTypes.STRING,
			tour_id: DataTypes.INTEGER,
			customer_id: DataTypes.INTEGER,
			number_of_pax: DataTypes.INTEGER,
			departure_date: {
				type: DataTypes.DATEONLY,
			},
			owner: DataTypes.INTEGER,
			booking_status: DataTypes.INTEGER,
			payment_status: DataTypes.INTEGER,
		},
		{
			hooks: {
				beforeCreate: (booking, options) => {
					booking.booking_number = booking_code();
				},
				beforeFind: (options) => {
					options.include = {
						all: true,
						nested: true,
						attributes: {
							exclude: [
								"id",
								"createdAt",
								"updatedAt",
								"password",
							],
						},
					};
				},
			},
			sequelize,
			modelName: "BookingInformation",
		}
	);
	return BookingInformation;
};
