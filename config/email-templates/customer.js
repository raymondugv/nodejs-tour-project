const newBookingForCustomer = (booking, customer) => `
	<p><strong>Booking Number:</strong> ${booking.booking_number}</p>
	<p><strong>Customer Name:</strong> ${customer.name}</p>
	<p><strong>Customer Email:</strong> ${customer.email}</p>
	<p><strong>Customer Phone:</strong> ${customer.phone}</p>

	<p><strong>Booking Status:</strong> New Booking</p>
	<p><strong>Payment Status:</strong> Waiting for payment</p>

	<p><strong>Number of Pax:</strong> ${booking.number_of_pax}</p>
	<p><strong>Departure Date:</strong> ${booking.departure_date}</p>
`;

const bookingUpdateForCustomer = (booking, customer) => `
	<p><strong>Booking Number:</strong> ${booking.booking_number}</p>
	<p><strong>Customer Name:</strong> ${customer.name}</p>
	<p><strong>Customer Email:</strong> ${customer.email}</p>
	<p><strong>Customer Phone:</strong> ${customer.phone}</p>

	<p><strong>Booking Status:</strong> ${booking.booking.name}</p>
	<p><strong>Payment Status:</strong> ${booking.payment.name}</p>

	<p><strong>Number of Pax:</strong> ${booking.number_of_pax}</p>
	<p><strong>Departure Date:</strong> ${booking.departure_date}</p>

	<p><strong>Updated At:</strong> ${booking.updatedAt}</p>
`;

const bookingCancleForCustomer = (booking) => `
	<p><strong>Booking Number:</strong> ${booking.booking_number}</p>
	<p><strong>Customer Name:</strong> ${customer.name}</p>
	<p><strong>Customer Email:</strong> ${customer.email}</p>
	<p><strong>Customer Phone:</strong> ${customer.phone}</p>

	<p><strong>Booking Status:</strong> ${booking.booking.name}</p>
	<p><strong>Payment Status:</strong> ${booking.payment.name}</p>

	<p><strong>Number of Pax:</strong> ${booking.number_of_pax}</p>
	<p><strong>Departure Date:</strong> ${booking.departure_date}</p>

	<p><strong>Updated At:</strong> ${booking.updatedAt}</p>
`;

const bookingPaymentUpdateForCustomer = (booking) => `
	<p><strong>Booking Number:</strong> ${booking.booking_number}</p>
	<p><strong>Customer Name:</strong> ${customer.name}</p>
	<p><strong>Customer Email:</strong> ${customer.email}</p>
	<p><strong>Customer Phone:</strong> ${customer.phone}</p>

	<p><strong>Booking Status:</strong> ${booking.booking.name}</p>
	<p><strong>Payment Status:</strong> ${booking.payment.name}</p>

	<p><strong>Number of Pax:</strong> ${booking.number_of_pax}</p>
	<p><strong>Departure Date:</strong> ${booking.departure_date}</p>

	<p><strong>Updated At:</strong> ${booking.updatedAt}</p>
`;

module.exports = {
	newBookingForCustomer,
	bookingUpdateForCustomer,
	bookingCancleForCustomer,
	bookingPaymentUpdateForCustomer,
};
