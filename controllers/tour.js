const models = require("../models");
const joi = require("joi");
const fs = require("fs");

const validate_schema = {
	title: joi.string().required(),
	slug: joi.string().required(),
	description: joi.string().required(),
	image: joi.string().dataUri(),
	price: joi.number().required(),
	departure_date: joi.date().required(),
	departure: joi.number().required(),
	arrival: joi.number().required(),
	owner: joi.number(),
	categories: joi.array(),
};

exports.index = async (req, res) => {
	try {
		let tours = await models.Tour.findAll();

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
		});

		if (!tour) return res.status(404).json({ message: "Tour not found" });

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
			price,
			departure_date,
			departure,
			arrival,
		} = req.body;

		let image = req.file;

		const schema = joi.object().keys(validate_schema);

		const { error, value } = schema.validate(req.body);

		if (error) {
			return res.status(400).json({ error });
		}

		if (!req.file)
			res.status(401).json({ error: "Please provide an image" });

		const tourExist = await models.Tour.findOne({
			where: { slug: slug },
		});

		if (tourExist) return res.status(400).json({ message: "Tour exist" });

		const tour = await models.Tour.create({
			title: title,
			slug: slug,
			description: description,
			image: image.path,
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
			price,
			departure_date,
			departure,
			arrival,
		} = req.body;

		let image = req.file;

		const schema = joi.object().keys(validate_schema);

		const { error, value } = schema.validate(req.body);

		if (error) {
			return res.status(400).json({ error });
		}

		const tour = await models.Tour.findOne({
			where: { id: req.params.id },
		});

		if (!tour) return res.status(404).json({ message: "Tour not found" });

		const old_image = tour.image;

		if (image) {
			fs.unlinkSync(old_image);
		}

		tour.update({
			title: title,
			slug: slug,
			description: description,
			image: image.path,
			price: price,
			departure_date: departure_date,
			departure: departure,
			arrival: arrival,
			owner: req.user.id,
		});

		tour.setCategories(req.body.categories);

		return res.status(200).json({ message: "Tour updated successfully" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

exports.active = async (req, res) => {
	try {
		let { status } = req.body;

		const tour = await models.Tour.findOne({
			where: { id: req.params.id },
		});

		if (!tour) return res.status(404).json({ message: "Tour not found" });

		tour.update({
			status: status,
		});

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

		if (!tour) return res.status(404).json({ message: "Tour not found" });

		if (req.user.roleId === tour.owner) {
			fs.unlinkSync(tour.image);
			await tour.destroy();
			return res
				.status(200)
				.json({ message: "Tour deleted successfully" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
