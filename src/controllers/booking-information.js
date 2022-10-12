import { BookingInformation } from "@models";
import Joi from "joi";
const { object, number, date } = Joi.types();

import { staffBookingCreated } from "@events/StaffEvent";

import { getPagination, getPagingData } from "@config/pagination";
import { filterFunction } from "@config/filterAndSort";

import {
	customerBookingCreated,
	customerBookingUpdate,
} from "@events/CustomerEvent";

import redis_config from "@config/redis";

const validate_schema = {
	tour_id: number.required(),
	customer_id: number.required(),
	number_of_pax: number.required(),
	departure_date: date.required(),
};

export async function index(req, res) {
	try {
		const { limit, offset, page } = getPagination(req.query);
		const filter = filterFunction(req.query);

		const bookings = await BookingInformation.findAndCountAll({
			limit,
			offset,
			where: filter,
		});

		const response = getPagingData(
			"booking-informations",
			bookings,
			page,
			limit
		);

		return res.status(200).json({ booking_informations: response });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

export async function show(req, res) {
	try {
		const booking = await BookingInformation.findOne({
			where: { id: req.params.id },
		});

		if (!booking)
			return res.status(404).json({ message: "Booking not found" });

		return res.status(200).json({ booking });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

export async function create(req, res) {
	try {
		const data = req.body;

		const schema = object.keys(validate_schema);

		const { error, value } = schema.validate(data);

		if (error) {
			return res.status(400).json({ error });
		}

		const { tour_id, customer_id, number_of_pax, departure_date } = data;

		const bookingCreate = await BookingInformation.create({
			tour_id,
			customer_id,
			number_of_pax,
			departure_date,
			owner: req.user.id,
		});

		const booking = await BookingInformation.findOne({
			where: { id: bookingCreate.id },
		});

		staffBookingCreated.emit("booking.created", booking);
		customerBookingCreated.emit("booking.created", booking);

		return res
			.status(201)
			.json({ message: "Booking created successfully" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

export async function update(req, res) {
	try {
		const data = req.body;
		const schema = object().keys({
			tour_id: number.required(),
			customer_id: number.required(),
			number_of_pax: number.required(),
			departure_date: date.required(),
			booking_status: number,
			payment_status: number,
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

		const booking = await BookingInformation.findOne({
			where: { id: req.params.id },
		});

		if (!booking)
			return res.status(404).json({ message: "Booking not found" });

		booking.update({
			tour_id,
			customer_id,
			number_of_pax,
			departure_date,
			booking_status,
			payment_status,
		});

		return res
			.status(200)
			.json({ message: "Booking updated successfully" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

export async function destroy(req, res) {
	try {
		const booking = await BookingInformation.findOne({
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
}
