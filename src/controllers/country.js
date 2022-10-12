const models = require("@models");
const joi = require("joi");
const { getPagination, getPagingData } = require("@config/pagination");
const { filterFunction } = require("@config/filterAndSort");

const validate_schema = {
	name: joi.string().required(),
};

exports.index = async (req, res) => {
	try {
		const { limit, offset, page } = getPagination(req.query);
		const filter = filterFunction(req.query);

		const countries = await models.Country.findAndCountAll({
			limit,
			offset,
			where: filter,
		});

		const response = getPagingData("countries", countries, page, limit);

		return res.status(200).json({ countries: response });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.show = async (req, res) => {
	try {
		const country = await models.Country.findOne({
			where: { id: req.params.id },
		});

		if (!country)
			return res.status(404).json({ message: "Country not found" });

		return res.status(200).json({ country });
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

		let { name } = data;

		const countryExist = await models.Country.findOne({ where: { name } });

		if (countryExist)
			return res.status(409).json({ message: "Country already exist" });

		const country = await models.Country.create({
			name: name,
		});

		return res
			.status(201)
			.json({ message: "Country created successfully", country });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

exports.update = async (req, res) => {
	try {
		const data = req.body;
		const schema = joi.object().keys(validate_schema);

		const { error, value } = schema.validate(data);

		if (error) return res.status(400).json({ error });

		let { name } = data;

		const country = await models.Country.findOne({
			where: { id: req.params.id },
		});

		if (!country)
			return res.status(404).json({ message: "Country not found" });

		country.update({ name: name });

		return res
			.status(200)
			.json({ message: "Country updated successfully" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

exports.destroy = async (req, res) => {
	try {
		const country = await models.Country.findOne({
			where: { id: req.params.id },
		});

		if (!country)
			return res.status(404).json({ message: "Country not found" });

		country.destroy();

		return res
			.status(200)
			.json({ message: "Country deleted successfully" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
