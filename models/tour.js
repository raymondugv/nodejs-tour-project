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
			this.belongsToMany(models.Category, {
				foreignKey: "tour_id",
				otherKey: "category_id",
				through: "tourscategories",
				as: "categories",
			});

			this.belongsTo(models.City, {
				as: "departureCity",
				foreignKey: "departure",
				onUpdate: "NO ACTION",
				onDelete: "NO ACTION",
				constraints: false,
			});

			this.belongsTo(models.City, {
				as: "arrivalCity",
				foreignKey: "arrival",
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
			hooks: {
				beforeFind: (options) => {
					options.attributes = {
						exclude: ["createdAt", "updatedAt"],
					};
				},
			},
			sequelize,
			modelName: "Tour",
		}
	);
	return Tour;
};
