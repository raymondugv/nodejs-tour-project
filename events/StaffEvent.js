const event = require("events");
const eventEmitter = new event.EventEmitter();
const models = require("@models");
const sendEmail = require("@controllers/sendEmail");
const exchange = require("@config/currencyTransfer");

const staffBookingCreated = eventEmitter.addListener(
	"booking.created",
	async (booking) => {
		sendEmail(
			"staff@nodetour.js",
			"New Booking received" + booking.booking_number,
			"@config/email-templates/newBookingStaff.html",
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

module.exports = { staffBookingCreated };
