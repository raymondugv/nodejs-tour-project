import { EventEmitter } from "events";
const eventEmitter = new EventEmitter();
import sendEmail from "@controllers/sendEmail";
import exchange from "@config/currencyTransfer";

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

export default { customerBookingCreated, customerBookingUpdate };
