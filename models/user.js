"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.Role, {
				as: "roleInfo",
				foreignKey: "role_id",
				onUpdate: "NO ACTION",
				onDelete: "NO ACTION",
				constraints: false,
			});
		}
	}
	User.init(
		{
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			role_id: DataTypes.INTEGER,
		},
		{
			hooks: {
				beforeFind: (options) => {
					options.attributes = { exclude: ["password"] };
					options.include = {
						all: true,
						nested: true,
						attributes: {
							exclude: ["id", "createdAt", "updatedAt"],
						},
					};
				},
			},
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
