"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class BookingInformation extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	BookingInformation.init(
		{
			booking_number: DataTypes.STRING,
			tour_id: DataTypes.INTEGER,
			customer_id: DataTypes.INTEGER,
			number_of_pax: DataTypes.INTEGER,
			departure_date: DataTypes.DATE,
			booking_status: DataTypes.INTEGER,
			payment_status: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "BookingInformation",
		}
	);
	return BookingInformation;
};
