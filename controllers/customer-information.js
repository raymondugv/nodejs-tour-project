const models = require("../models");
const joi = require("joi");

const options = {
	raw: true,
	attributes: ["id", "name", "description", "slug", "country"],
};

// index
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
			country: joi.number().required(),
			slug: joi.string().required(),
			description: joi.string(),
		});

		const { error, value } = schema.validate(data);

		if (error) {
			return res.status(400).json({ error });
		}

		let { name, country, slug, description } = data;
		const cityExist = await models.CustomerInformation.findOne({
			where: { slug },
		});

		if (cityExist) {
			return res.status(409).json({ message: "Customer already exist" });
		}

		const customerCreate = await models.CustomerInformation.create({
			name: name,
			country: country,
			slug: slug,
			description: description,
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
			country: joi.number().required(),
			slug: joi.string().required(),
			description: joi.string(),
		});

		const { error, value } = schema.validate(data);

		if (error) {
			return res.status(400).json({ error });
		}

		let { name, country, slug, description } = data;
		const cityExist = await models.CustomerInformation.findOne({
			where: { slug },
		});

		if (cityExist) {
			return res.status(409).json({ message: "Customer already exist" });
		}

		const customerUpdate = await models.CustomerInformation.update(
			{
				name: name,
				country: country,
				slug: slug,
				description: description,
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
