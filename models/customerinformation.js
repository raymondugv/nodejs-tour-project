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
			// define association here
		}
	}
	CustomerInformation.init(
		{
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			phone: DataTypes.STRING,
			gender: DataTypes.ENUM("0", "1"),
		},
		{
			sequelize,
			modelName: "CustomerInformation",
		}
	);
	return CustomerInformation;
};
