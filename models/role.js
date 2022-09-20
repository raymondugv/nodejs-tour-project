"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Role extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.User, {
				as: "users",
				foreignKey: "role_id",
				onUpdate: "NO ACTION",
				onDelete: "NO ACTION",
				constraints: false,
			});
		}
	}
	Role.init(
		{
			name: DataTypes.STRING,
			description: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Role",
		}
	);
	return Role;
};
