const models = require("../models");
const joi = require("joi");
const validate_schema = {
	name: joi.string().required(),
	country: joi.number().required(),
	slug: joi.string().required(),
	description: joi.string(),
};

exports.index = async (req, res) => {
	try {
		const cities = await models.City.findAll();

		return res.status(200).json({ cities });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

exports.show = async (req, res) => {
	try {
		const city = await models.City.findOne({
			where: { id: req.params.id },
		});

		if (!city) return res.status(404).json({ message: "City not found" });

		return res.status(200).json({ city });
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

		const { name, country, slug, description } = data;

		const cityExist = await models.City.findOne({ where: { slug } });

		if (cityExist)
			return res.status(409).json({ message: "City already exist" });

		const city = await models.City.create({
			name: name,
			country: country,
			slug: slug,
			description: description,
		});

		return res
			.status(201)
			.json({ message: "City created successfully", city });
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

		const city = await models.City.findOne({
			where: { id: req.params.id },
		});

		if (!city) return res.status(404).json({ message: "City not found" });

		const { name, country, slug, description } = data;

		const cityExist = await models.City.findOne({
			where: { slug },
		});

		if (cityExist) {
			return res.status(409).json({ message: "City already exist" });
		}

		city.update({
			name: name,
			country: country,
			slug: slug,
			description: description,
		});

		return res.status(200).json({ message: "City updated successfully" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

exports.delete = async (req, res) => {
	try {
		const city = await models.City.findOne({
			where: { id: req.params.id },
		});

		if (!city) return res.status(404).json({ message: "City not found" });

		city.destroy();

		return res.status(200).json({ message: "City deleted successfully" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
