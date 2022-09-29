"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class CustomerInformation extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.BookingInformation, {
				foreignKey: "customer_id",
				as: "bookings",
			});
		}
	}
	CustomerInformation.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
				},
			},
			phone: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			gender: {
				type: DataTypes.ENUM("0", "1"),
				defaultValue: "0",
				allowNull: false,
			},
		},
		{
			hooks: {
				beforeFind: (options) => {
					options.attributes = [
						"id",
						"name",
						"email",
						"phone",
						"gender",
						"createdAt",
						"updatedAt",
					];
					options.order = [
						["createdAt", "DESC"],
						["id", "DESC"],
					];
				},
			},
			sequelize,
			modelName: "CustomerInformation",
		}
	);
	return CustomerInformation;
};
