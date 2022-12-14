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
			this.belongsTo(models.Country, {
				as: "countries",
				foreignKey: "country",
				onUpdate: "NO ACTION",
				onDelete: "NO ACTION",
				constraints: false,
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
			hooks: {
				beforeFind: (options) => {
					options.attributes = [
						"id",
						"name",
						"description",
						"slug",
						"createdAt",
						"updatedAt",
					];
					options.include = {
						all: true,
						nested: true,
						attributes: {
							exclude: ["id", "createdAt", "updatedAt"],
						},
					};
					options.order = [
						["createdAt", "DESC"],
						["id", "DESC"],
					];
				},
			},
			sequelize,
			modelName: "City",
		}
	);
	return City;
};
