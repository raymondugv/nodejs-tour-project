"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
const salt = 10;

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
					options.attributes = ["id", "name", "email"];
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
				beforeCreate: (user, options) => {
					user.password = bcrypt.hashSync(user.password, salt);
				},
				beforeUpdate: (user, options) => {
					if (user.changed("password")) {
						user.password = bcrypt.hashSync(user.password, salt);
					}
				},
			},
			defaultScope: {
				attributes: { exclude: ["password"] },
			},
			scopes: {
				withPassword: {
					attributes: {},
				},
			},
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
