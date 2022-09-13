"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Category extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsToMany(models.Tour, {
				through: "tourcategories",
				as: "tours",
				foreignKey: "category_id",
			});
		}
	}
	Category.init(
		{
			name: DataTypes.STRING,
			slug: DataTypes.STRING,
			description: DataTypes.TEXT,
			parent_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Category",
		}
	);
	return Category;
};
