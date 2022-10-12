const event = require("events");
const eventEmitter = new event.EventEmitter();
const sendEmail = require("@controllers/sendEmail");
const exchange = require("@config/currencyTransfer");

const customerBookingCreated = eventEmitter.addListener(
	"booking.created",
	async (booking) => {
		await sendEmail(
			booking.customer.email,
			"Booking Confirmation for #" + booking.booking_number,
			"@config/email-templates/newBookingCustomer.html",
			{
				bookingNumber: booking.booking_number,
				createdAt: booking.createdAt,
				customerName: booking.customer.name,
				customerEmail: booking.customer.email,
				customerPhone: booking.customer.phone,
				tourTitle: booking.tour.title,
				tourDescription: booking.tour.description,
				numberOfPax: booking.number_of_pax,
				tourPrice: exchange(booking.tour.price),
			}
		);
	}
);

const customerBookingUpdate = eventEmitter.addListener(
	"booking.updated",
	async (booking) => {
		await sendEmail(
			booking.customer.email,
			"Booking #" + booking.booking_number + " updated",
			"@config/email-templates/updateBookingCustomer.html",
			{
				bookingNumber: booking.booking_number,
			}
		);
	}
);

module.exports = {
	customerBookingCreated,
	customerBookingUpdate,
};
