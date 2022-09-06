"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class City extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.Country.belongsTo(models.City, {
				foreignKey: "countryId",
				targetKey: "id",
			});
		}
	}
	City.init(
		{
			name: DataTypes.STRING,
			country: DataTypes.INTEGER,
			slug: DataTypes.STRING,
			description: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "City",
		}
	);
	return City;
};
