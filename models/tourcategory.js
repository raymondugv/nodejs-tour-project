"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class TourCategory extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	TourCategory.init(
		{
			category_id: DataTypes.INTEGER,
			tour_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "TourCategory",
		}
	);
	return TourCategory;
};
