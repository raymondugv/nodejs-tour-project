import { EventEmitter } from "events";
const eventEmitter = new EventEmitter();
import models from "@models";
import sendEmail from "@controllers/sendEmail";
import exchange from "@config/currencyTransfer";

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

export default { staffBookingCreated };
