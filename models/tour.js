"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Tour extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.TourCategory, {
				as: "tourCategories",
				foreignKey: "tour",
				onUpdate: "NO ACTION",
				onDelete: "NO ACTION",
				constraints: false,
			});
		}
	}
	Tour.init(
		{
			title: DataTypes.STRING,
			slug: DataTypes.STRING,
			description: DataTypes.TEXT,
			image: DataTypes.STRING,
			price: DataTypes.DECIMAL,
			departure_date: DataTypes.TEXT,
			departure: DataTypes.INTEGER,
			arrival: DataTypes.INTEGER,
			owner: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Tour",
		}
	);
	return Tour;
};
