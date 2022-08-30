const models = require("../models");
const joi = require("joi");

const options = {
	raw: true,
	attributes: [
		"id",
		"title",
		"slug",
		"description",
		"image",
		"price",
		"departure_date",
		"departure",
		"arrival",
		"owner",
	],
};

exports.index = async (req, res) => {
	try {
		const tours = await models.Tour.findAll(options);

		return res.status(200).json({ tours });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

exports.show = async (req, res) => {
	try {
		const tour = await models.Tour.findOne({
			where: { id: req.params.id },
			...options,
		});

		return res.status(200).json({ tour });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

exports.create = async (req, res) => {
	try {
		const data = req.body;
		const schema = joi.object().keys({
			title: joi.string().required(),
			slug: joi.string().required(),
			description: joi.string().required(),
			image: joi.string().required(),
			price: joi.number().required(),
			departure_date: joi.date().required(),
			departure: joi.number().required(),
			arrival: joi.number().required(),
			owner: joi.number().required(),
		});

		const { error, value } = schema.validate(data);

		if (error) {
			return res.status(400).json({ error });
		}

		let {
			title,
			slug,
			description,
			image,
			price,
			departure_date,
			departure,
			arrival,
			owner,
		} = data;

		const tour = await models.Tour.create({
			title: title,
			slug: slug,
			description: description,
			image: image,
			price: price,
			departure_date: departure_date,
			departure: departure,
			arrival: arrival,
			owner: owner,
		});

		return res
			.status(201)
			.json({ message: "Tour created successfully", tour });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

exports.update = async (req, res) => {
	try {
		const data = req.body;
		const schema = joi.object().keys({
			title: joi.string().required(),
			slug: joi.string().required(),
			description: joi.string().required(),
			image: joi.string().required(),
			price: joi.number().required(),
			departure_date: joi.date().required(),
			departure: joi.number().required(),
			arrival: joi.number().required(),
			owner: joi.number().required(),
		});

		const { error, value } = schema.validate(data);

		if (error) {
			return res.status(400).json({ error });
		}

		let {
			title,
			slug,
			description,
			image,
			price,
			departure_date,
			departure,
			arrival,
			owner,
		} = data;

		const tour = await models.Tour.update(
			{
				title: title,
				slug: slug,
				description: description,
				image: image,
				price: price,
				departure_date: departure_date,
				departure: departure,
				arrival: arrival,
				owner: owner,
			},
			{ where: { id: req.params.id } }
		);

		return res.status(200).json({ message: "Tour updated successfully" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

exports.delete = async (req, res) => {
	try {
		const tour = await models.Tour.destroy({
			where: { id: req.params.id },
		});

		return res.status(200).json({ message: "Tour deleted successfully" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
