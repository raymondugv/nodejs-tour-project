const models = require("../models");
const joi = require("joi");

const options = {
	raw: true,
	attributes: [
		"booking_number",
		"tour_id",
		"customer_id",
		"number_of_pax",
		"departure_date",
	],
};

const include = { all: true, nested: true };

exports.index = async (req, res) => {
	try {
		const bookings = await models.BookingInformation.findAll({
			include: include,
			...options,
		});
		return res.status(200).json({ bookings });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

exports.show = async (req, res) => {
	try {
		const booking = await models.BookingInformation.findOne({
			where: { id: req.params.id },
			...options,
			include,
		});
		return res.status(200).json({ booking });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

exports.create = async (req, res) => {
	try {
		const { tour_id, customer_id, number_of_pax, departure_date } =
			req.body;

		const schema = joi.object().keys({
			tour_id: joi.number().required(),
			customer_id: joi.number().required(),
			number_of_pax: joi.number().required(),
			departure_date: joi.date().required(),
		});

		const { error, value } = schema.validate(data);

		if (error) {
			return res.status(400).json({ error });
		}

		const bookingCreate = await models.BookingInformation.create({
			tour_id,
			customer_id,
			number_of_pax,
			departure_date,
		});

		return res
			.status(201)
			.json({ message: "Booking created successfully" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

exports.update = async (req, res) => {
	try {
		const data = req.body;
		const schema = joi.object().keys({
			tour_id: joi.number().required(),
			customer_id: joi.number().required(),
			number_of_pax: joi.number().required(),
			departure_date: joi.date().required(),
			booking_status: joi.number(),
			payment_status: joi.number(),
		});

		const { error, value } = schema.validate(data);

		if (error) {
			return res.status(400).json({ error });
		}

		const {
			tour_id,
			customer_id,
			number_of_pax,
			departure_date,
			booking_status,
			payment_status,
		} = data;

		const bookingUpdate = await models.BookingInformation.update(
			{
				tour_id,
				customer_id,
				number_of_pax,
				departure_date,
				booking_status,
				payment_status,
			},
			{ where: { id: req.params.id } }
		);

		return res
			.status(200)
			.json({ message: "Booking updated successfully" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

exports.delete = async (req, res) => {
	try {
		const bookingDelete = await models.BookingInformation.destroy({
			where: { id: req.params.id },
		});

		return res
			.status(200)
			.json({ message: "Booking deleted successfully" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
