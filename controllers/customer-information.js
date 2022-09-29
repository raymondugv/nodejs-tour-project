const models = require("../models");
const joi = require("joi");

const validate_schema = {
	name: joi.string().required(),
	email: joi.string().email().required(),
	gender: joi.number().required(),
	phone: joi.string().required(),
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
		const schema = joi.object().keys(validate_schema);

		const { error, value } = schema.validate(data);

		if (error) {
			return res.status(400).json({ error });
		}

		let { name, email, gender, phone } = data;

		const customer = await models.CustomerInformation.create({
			name,
			email,
			phone,
			gender,
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
		const schema = joi.object().keys(validate_schema);

		const { error, value } = schema.validate(data);

		if (error) {
			return res.status(400).json({ error });
		}

		let { name, email, phone, gender } = data;

		const customer = await models.CustomerInformation.findOne({
			where: { id: req.params.id },
		});

		if (!customer)
			return res.status(404).json({ error: "Customer not found" });

		const customerExist = await models.CustomerInformation.findOne({
			where: { email, phone },
		});

		if (customerExist)
			return res
				.status(404)
				.json({ error: "Email or Phone already exist" });

		customer.update({
			name,
			email,
			phone,
			gender,
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
