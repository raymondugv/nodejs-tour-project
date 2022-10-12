const event = require("events");
const eventEmitter = new event.EventEmitter();

const sendEmail = require("@controllers/sendEmail").default;
const exchange = require("@config/currencyTransfer");

const newBookingEvent = eventEmitter.addListener(
	"booking.created",
	async (booking) => {
		const fields = {
			bookingNumber: booking.booking_number,
			createdAt: booking.createdAt,
			customerName: booking.customer.name,
			customerEmail: booking.customer.email,
			customerPhone: booking.customer.phone,
			tourTitle: booking.tour.title,
			tourDescription: booking.tour.description,
			numberOfPax: booking.number_of_pax,
			tourPrice: exchange(booking.tour.price),
		};

		await sendEmail(
			"staff@nodetour.js",
			"New Booking received " + booking.booking_number,
			"@email/staff/newBooking.html",
			fields
		);

		setTimeout(async () => {
			await sendEmail(
				"customer@nodetour.js",
				"New Booking Customer " + booking.booking_number,
				"@email/customer/newBooking.html",
				fields
			);
		}, 1000);
	}
);

module.exports = { newBookingEvent };