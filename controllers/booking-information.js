const models = require("../models");
const joi = require("joi");
const sendEmail = require("../controllers/sendEmail");
const { newBookingForStaff } = require("../config/email-templates/staff");
const {
	newBookingForCustomer,
	bookingUpdateForCustomer,
} = require("../config/email-templates/customer");

exports.index = async (req, res) => {
	try {
		const bookings = await models.BookingInformation.findAll({
			order: [["createdAt", "DESC"]],
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
		});

		if (!booking)
			return res.status(404).json({ message: "Booking not found" });

		return res.status(200).json({ booking });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

exports.create = async (req, res) => {
	try {
		const data = req.body;

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

		const { tour_id, customer_id, number_of_pax, departure_date } = data;
		const booking = await models.BookingInformation.create({
			tour_id,
			customer_id,
			number_of_pax,
			departure_date,
			owner: req.user.id,
		});

		const customer = await models.CustomerInformation.findOne({
			where: { id: customer_id },
		});

		var email_staff = await sendEmail(
			"staff@nodetour.js",
			"New Booking received",
			newBookingForStaff(booking, customer)
		);

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
			owner: joi.number(),
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

		const booking = await models.BookingInformation.findOne({
			where: { id: req.params.id },
		});

		if (!booking)
			return res.status(404).json({ message: "Booking not found" });

		booking.update(
			{
				tour_id,
				customer_id,
				number_of_pax,
				departure_date,
				booking_status,
				payment_status,
				owner: req.user.id,
			},
			{ where: { id: req.params.id } }
		);

		const email = sendEmail(
			booking.customer.email,
			"Cập nhật booking",
			bookingUpdateForCustomer(booking, booking.customer)
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
		const booking = await models.BookingInformation.findOne({
			where: { id: req.params.id },
		});

		if (!booking)
			return res.status(404).json({ message: "Booking not found" });

		if (booking.owner !== req.user.id)
			return res.status(403).json({
				message: "You are not authorized to delete this booking",
			});

		booking.destroy();

		return res
			.status(200)
			.json({ message: "Booking deleted successfully" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
