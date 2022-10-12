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
			//
		}
	}
	TourCategory.init(
		{
			category_id: DataTypes.INTEGER,
			tour_id: DataTypes.INTEGER,
		},
		{
			hooks: {
				beforeFind: (options) => {
					options.attributes = {
						exclude: ["createdAt", "updatedAt"],
					};
				},
			},
			sequelize,
			modelName: "TourCategory",
			tableName: "tourscategories",
		}
	);
	return TourCategory;
};
