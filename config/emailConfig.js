require("dotenv").config();

export const emailConfig = {
	host: process.env.EMAIL_HOST,
	port: process.env.EMAIL_PORT,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
};

export const from_address = process.env.FROM_ADDRESS;
