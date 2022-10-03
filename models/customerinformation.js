"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
const salt = 10;

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
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
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
			birthday: {
				type: DataTypes.DATEONLY,
			},
			avatar: {
				type: DataTypes.STRING,
			},
		},
		{
			defaultScope: {
				attributes: { exclude: ["password"] },
			},
			scopes: {
				withPassword: {
					attributes: {},
				},
			},
			hooks: {
				beforeFind: (options) => {
					options.attributes = [
						"id",
						"name",
						"email",
						"username",
						"phone",
						"gender",
						"birthday",
						"avatar",
						"createdAt",
						"updatedAt",
					];
					options.order = [
						["createdAt", "DESC"],
						["id", "DESC"],
					];
				},
				beforeCreate: (customer, options) => {
					customer.password = bcrypt.hashSync(
						customer.password,
						salt
					);
				},
				beforeUpdate: (customer, options) => {
					if (customer.changed("password")) {
						customer.password = bcrypt.hashSync(
							customer.password,
							salt
						);
					}
				},
			},
			sequelize,
			modelName: "CustomerInformation",
		}
	);
	return CustomerInformation;
};
