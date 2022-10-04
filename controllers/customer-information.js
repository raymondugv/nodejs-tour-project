const models = require("../models");
const joi = require("joi");
const { Op } = require("sequelize");
const { custom } = require("joi");

const validate_schema = {
	name: joi.string().required(),
	email: joi.string().email().required(),
	gender: joi.number().required(),
	phone: joi.string().required(),
	username: joi.string().required(),
	password: joi.string().required(),
	birthday: joi.date(),
};

exports.index = async (req, res) => {
	try {
		const customers = await models.CustomerInformation.findAll();

		return res.status(200).json({ customers });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

exports.show = async (req, res) => {
	try {
		const customer = await models.CustomerInformation.findOne({
			where: { id: req.params.id },
		});

		if (!customer)
			return res.status(404).json({ error: "Customer not found" });

		return res.status(200).json({ customer });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

exports.create = async (req, res) => {
	try {
		const data = req.body;
		let image = req.file;

		const schema = joi.object().keys(validate_schema);

		const { error, value } = schema.validate(data);

		if (error) return res.status(400).json({ error });

		if (!image) return res.status(400).json({ error: "Image is required" });

		let { name, email, gender, phone, username, password, birthday } = data;

		const customerExist = await models.CustomerInformation.findOne({
			where: {
				[Op.or]: [{ email }, { username }, { phone }],
			},
		});

		if (customerExist)
			return res.status(400).json({ error: "Username or Email existed" });

		const customer = await models.CustomerInformation.create({
			name,
			email,
			phone,
			gender,
			username,
			password,
			birthday,
			avatar: image.path,
		});

		return res
			.status(201)
			.json({ message: "Customer created successfully", customer });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

exports.update = async (req, res) => {
	try {
		const data = req.body;
		const schema = joi.object().keys({
			name: joi.string().required(),
			email: joi.string().email().required(),
			gender: joi.number().required(),
			phone: joi.string().required(),
			username: joi.string().required(),
			password: joi.string(),
			birthday: joi.date(),
		});

		const { error, value } = schema.validate(data);

		if (error) {
			return res.status(400).json({ error });
		}

		let { name, email, gender, phone, username, password, birthday } = data;

		const customer = await models.CustomerInformation.findOne({
			where: { id: req.params.id },
		});

		if (!customer)
			return res.status(404).json({ error: "Customer not found" });

		let avatar = customer.avatar;

		if (req.file) {
			avatar = req.file;
		}

		if (
			customer.email !== email ||
			customer.username !== username ||
			customer.phone !== phone
		) {
			const customerExist = await models.CustomerInformation.findOne({
				where: {
					[Op.or]: [{ email }, { username }, { phone }],
				},
			});

			if (customerExist)
				return res
					.status(404)
					.json({ error: "Username, Email or Phone already exist" });
		}

		customer.update({
			name,
			email,
			phone,
			gender,
			username,
			password,
			birthday,
			avatar: avatar,
		});

		return res
			.status(200)
			.json({ message: "Customer updated successfully" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

exports.delete = async (req, res) => {
	try {
		const customer = await models.CustomerInformation.findOne({
			where: { id: req.params.id },
		});

		if (!customer)
			return res.status(404).json({ error: "Customer not found" });

		await customer.destroy();

		return res
			.status(200)
			.json({ message: "Customer deleted successfully" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
