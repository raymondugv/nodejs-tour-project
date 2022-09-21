const models = require("../models");
const joi = require("joi");

const options = {
	raw: true,
	attributes: ["id", "name", "email", "gender"],
};

exports.index = async (req, res) => {
	try {
		const customers = await models.CustomerInformation.findAll({
			options: options,
		});
		return res.status(200).json({ customers });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

exports.show = async (req, res) => {
	try {
		const customer = await models.CustomerInformation.findOne({
			where: { id: req.params.id },
			...options,
		});

		if (!customer) {
			return res.status(404).json({ error: "Customer not found" });
		}

		return res.status(200).json({ customer });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

exports.create = async (req, res) => {
	try {
		const data = req.body;
		const schema = joi.object().keys({
			name: joi.string().required(),
			email: joi.string().email().required(),
			gender: joi.number().required(),
			phone: joi.string().required(),
		});

		const { error, value } = schema.validate(data);

		if (error) {
			return res.status(400).json({ error });
		}

		let { name, email, gender, phone } = data;

		const customerCreate = await models.CustomerInformation.create({
			name,
			email,
			phone,
			gender,
		});

		return res
			.status(201)
			.json({ message: "Customer created successfully" });
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
		});

		const { error, value } = schema.validate(data);

		if (error) {
			return res.status(400).json({ error });
		}

		let { name, email, phone, gender } = data;

		const customerUpdate = await models.CustomerInformation.update(
			{
				name,
				email,
				phone,
				gender,
			},
			{ where: { id: req.params.id } }
		);

		return res
			.status(200)
			.json({ message: "Customer updated successfully" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

exports.delete = async (req, res) => {
	try {
		const customerDelete = await models.CustomerInformation.destroy({
			where: { id: req.params.id },
		});
		return res
			.status(200)
			.json({ message: "Customer deleted successfully" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
