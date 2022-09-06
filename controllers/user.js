const models = require("../models");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const salt = 10;

const options = {
	raw: true,
	attributes: ["id", "name", "email", "role_id"],
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

		const userExist = await models.User.findOne({
			where: { email: email },
		});

		const isPasswordMatch = await bcrypt.compare(
			password,
			userExist.password
		);

		if (!isPasswordMatch) {
			return res.status(500).json({ message: "Password is incorrect" });
		}

		const token = jwt.sign(
			{
				id: userExist.id,
				roleId: userExist.role_id,
				name: userExist.name,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: process.env.JWT_EXPIRE,
			}
		);

		return res.status(200).json({
			message: "Login successfully",
			user: {
				name: userExist.name,
				email: userExist.email,
				role_id: userExist.role_id,
			},
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
		const users = await models.User.findAll(options);
		return res.status(200).json({ users });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

// show
exports.show = async (req, res) => {
	try {
		const user = await models.User.findOne({
			where: { id: req.params.id },
			...options,
		});
		return res.status(200).json({ user });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

// create
exports.create = async (req, res) => {
	try {
		const data = req.body;
		const schema = joi.object().keys({
			name: joi.string().required(),
			email: joi.string().email().required(),
			password: joi.string().required(),
			role_id: joi.number().required(),
		});
		const { error, value } = schema.validate(data);
		if (error) {
			return res.status(400).json({ error });
		}
		let { name, email, password, role_id } = data;
		password = await bcrypt.hash(password, salt);
		const userExist = await models.User.findOne({ where: { email } });

		if (userExist) {
			return res.status(409).json({ message: "User already exist" });
		}

		const user = await models.User.create({
			name: name,
			email: email,
			password: password,
			role_id: role_id,
		});

		return res
			.status(201)
			.json({ message: "User created successfully", user });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

// update
exports.update = async (req, res) => {
	try {
		const data = req.body;
		const schema = joi.object().keys({
			name: joi.string(),
			email: joi.string().email(),
			password: joi.string(),
			role_id: joi.number(),
		});

		const { error, value } = schema.validate(data);

		if (error) {
			return res.status(400).json({ error });
		}

		const { name, email, password, role_id } = data;

		const userExist = await models.User.findOne({ email: email });

		if (userExist) {
			return res.status(409).json({ message: "User already exist" });
		}

		const user = await models.User.update(
			{
				name: name,
				email: email,
				password: bcrypt.hash(password, salt),
				role_id: role_id,
			},
			{ where: { id: req.params.id } }
		);

		return res.status(200).json({ user });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

// destroy
exports.delete = async (req, res) => {
	try {
		const userDelete = await models.User.destroy({
			where: { id: req.params.id },
		});

		return res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
