const newBookingForStaff = (booking, customer) => `
<p><strong>Booking Number:</strong> ${booking.booking_number}</p>
<p><strong>Customer Name:</strong> ${customer.name}</p>
<p><strong>Customer Email:</strong> ${customer.email}</p>
<p><strong>Customer Phone:</strong> {customer.phone}</p>
`;

module.exports = { newBookingForStaff };
