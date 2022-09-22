const nodemailer = require("nodemailer");
const { emailConfig, from_address } = require("../config/emailConfig");

module.exports = (email, subject, message) => {
	const transporter = nodemailer.createTransport(emailConfig);

	console.log({ email, subject, message });

	const mainOptions = {
		from: from_address,
		to: email,
		subject: subject,
		html: message,
	};

	return transporter.sendMail(mainOptions, (err, info) => {
		if (err) {
			console.log({ err });
			return err;
		} else {
			console.log("Message sent: " + info.response);
			return info.response;
		}
	});
};
