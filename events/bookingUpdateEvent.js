const event = require("events");
const eventEmitter = new event.EventEmitter();

const sendEmail = require("../controllers/sendEmail");
const exchange = require("../config/currencyTransfer");

const bookingUpdateEvent = eventEmitter.addListener(
	"booking.updated",
	async (booking) => {
		await sendEmail(
			"update-customer@nodetour.js",
			"Update Booking Customer" + booking.booking_number,
			"../emails/customer/updateBooking.html",
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

module.exports = { bookingUpdateEvent };
