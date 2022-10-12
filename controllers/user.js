const models = require("@models");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getPagination, getPagingData } = require("@config/pagination");
const { filterFunction } = require("../config/filterAndSort");

const validate_schema = {
	name: joi.string().required(),
	email: joi.string().email().required(),
	password: joi.string().required(),
	role_id: joi.number().required(),
};

exports.login = async (req, res) => {
	try {
		const data = req.body;
		const schema = joi.object().keys({
			email: joi.string().email().required(),
			password: joi.string().required(),
		});

		const { error, value } = schema.validate(data);

		if (error) {
			return res.status(400).json({ error });
		}

		const { email, password } = data;

		const user = await models.User.scope("withPassword").findOne({
			where: { email },
		});

		if (!user) return res.status(404).json({ message: "User not found" });

		const isPasswordMatch = await bcrypt.compare(password, user.password);

		if (!isPasswordMatch)
			return res.status(401).json({ message: "Password is incorrect" });

		const token = jwt.sign(
			{
				id: user.id,
				roleId: user.role_id,
				name: user.name,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: process.env.JWT_EXPIRE,
			}
		);

		return res.status(200).json({
			message: "Login successfully",
			token,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

exports.logout = async (req, res) => {
	try {
		const authHeader = req.headers["authorization"];

		jwt.sign(
			authHeader,
			process.env.JWT_SECRET,
			{ expiresIn: 1 },
			(logout, error) => {
				if (logout) {
					res.json({ message: "You have been logged out." });
				} else {
					res.status(500).json({ message: error });
				}
			}
		);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

// index
exports.index = async (req, res) => {
	try {
		const { limit, offset, page } = getPagination(req.query);
		const filter = filterFunction(req.query);

		let users = await models.User.findAndCountAll({
			limit,
			offset,
			where: filter,
		});

		const response = getPagingData("users", users, page, limit);

		return res.status(200).json({ users: response });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

// show
exports.show = async (req, res) => {
	try {
		const user = await models.User.findOne({
			where: { id: req.params.id },
		});

		if (!user) return res.status(404).json({ message: "User not found" });

		return res.status(200).json({ user });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

// create
exports.create = async (req, res) => {
	try {
		const schema = joi.object().keys(validate_schema);

		const { error, value } = schema.validate(req.body);

		if (error) {
			return res.status(400).json({ error });
		}

		let { name, email, password, role_id } = req.body;

		const userExist = await models.User.findOne({
			where: { email: req.body.email },
		});

		if (userExist)
			return res.status(409).json({ message: "User already exist" });

		const user = await models.User.create({
			name: name,
			email: email,
			password: password,
			role_id: role_id,
		});

		return res.status(201).json({ message: "User created successfully" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

// update
exports.update = async (req, res) => {
	try {
		const schema = joi.object().keys(validate_schema);

		const { error, value } = schema.validate(req.body);

		if (error) {
			return res.status(400).json({ error });
		}

		let { name, email, password, role_id } = req.body;

		const userExists = await models.User.findOne({
			where: { email },
		});

		if (userExists) return res.status(404).json({ message: "User exists" });

		const user = await models.User.findOne({
			where: { id: req.params.id },
		});

		if (!user) return res.status(404).json({ message: "User not found" });

		user.update({
			name: name,
			email: email,
			password: password,
			role_id: role_id,
		});

		return res.status(200).json({ message: "User updated successfully" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

// destroy
exports.delete = async (req, res) => {
	try {
		const user = await models.User.findOne({
			where: { id: req.params.id },
		});

		if (!user) return res.status(404).json({ message: "User not found" });

		user.destroy();

		return res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
