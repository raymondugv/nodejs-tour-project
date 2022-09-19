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
		"status",
	],
};

exports.index = async (req, res) => {
	try {
		let tours = await models.Tour.findAll({
			options: options,
		});

		if (req.user.roleId !== 1) {
			tours = tours.filter((tour) => tour.owner === req.user.id);
		}

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
			include: ["categories"],
		});

		if (!tour) {
			return res.status(404).json({ message: "Tour not found" });
		}

		if (tour.owner !== req.user.roleId) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		return res.status(200).json({ tour });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

exports.create = async (req, res) => {
	try {
		let {
			title,
			slug,
			description,
			image,
			price,
			departure_date,
			departure,
			arrival,
		} = req.body;

		const schema = joi.object().keys({
			title: joi.string().required(),
			slug: joi.string().required(),
			description: joi.string().required(),
			image: joi.string().required(),
			price: joi.number().required(),
			departure_date: joi.date().required(),
			departure: joi.number().required(),
			arrival: joi.number().required(),
			owner: joi.number(),
			categories: joi.array(),
		});

		const { error, value } = schema.validate(req.body);

		if (error) {
			return res.status(400).json({ error });
		}

		const tour = await models.Tour.create({
			title: title,
			slug: slug,
			description: description,
			image: image,
			price: price,
			departure_date: departure_date,
			departure: departure,
			arrival: arrival,
			owner: req.user.id,
		});

		tour.addCategories(req.body.categories);

		return res
			.status(201)
			.json({ message: "Tour created successfully", tour });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

exports.update = async (req, res) => {
	try {
		let {
			title,
			slug,
			description,
			image,
			price,
			departure_date,
			departure,
			arrival,
		} = req.body;

		const schema = joi.object().keys({
			title: joi.string().required(),
			slug: joi.string().required(),
			description: joi.string().required(),
			image: joi.string().required(),
			price: joi.number().required(),
			departure_date: joi.date().required(),
			departure: joi.number().required(),
			arrival: joi.number().required(),
			owner: joi.number(),
			categories: joi.array(),
		});

		const { error, value } = schema.validate(req.body);

		if (error) {
			return res.status(400).json({ error });
		}

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
				owner: req.user.id,
			},
			{ where: { id: req.params.id } }
		);

		models.categories.findOne(tour).then((product) => {
			if (product) {
				product.updateAttributes(req.body.categories).then((result) => {
					return result;
				});
			} else {
				return res.status(404).json({ message: "Tour not found" });
			}
		});

		return res.status(200).json({ message: "Tour updated successfully" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

exports.active = async (req, res) => {
	try {
		let { status } = req.body;

		const tour = await models.Tour.update(
			{
				status: status,
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
		const tour = await models.Tour.findOne({
			where: { id: req.params.id },
		});

		if (req.user.roleId === tour.owner) {
			await models.Tour.destroy({ where: { id: req.params.id } });
			return res
				.status(200)
				.json({ message: "Tour deleted successfully" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
