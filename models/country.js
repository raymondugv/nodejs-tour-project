"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Country extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.City, {
				as: "cities",
				foreignKey: "country",
				onUpdate: "NO ACTION",
				onDelete: "NO ACTION",
				constraints: false,
			});
		}
	}
	Country.init(
		{
			name: DataTypes.STRING,
		},
		{
			hooks: {
				beforeFind: (options) => {
					options.attributes = [
						"id",
						"name",
						"createdAt",
						"updatedAt",
					];
					options.include = {
						all: true,
						nested: true,
						attributes: {
							exclude: ["createdAt", "updatedAt"],
						},
					};
					options.order = [
						["createdAt", "DESC"],
						["id", "desc"],
					];
				},
			},
			sequelize,
			modelName: "Country",
		}
	);
	return Country;
};
