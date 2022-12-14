const nodemailer = require("nodemailer");
const { emailConfig, from_address } = require("@config/emailConfig");
const fs = require("fs").promises;
const path = require("path");
const handlebars = require("handlebars");

module.exports = async (email, subject, emailTemplate, replacements = null) => {
	const transporter = nodemailer.createTransport(emailConfig);

	const templatePath = path.join(__dirname, emailTemplate);
	const templateFile = await fs.readFile(templatePath, "utf-8");
	const template = handlebars.compile(templateFile);

	const finalHtml = template(replacements);

	const mainOptions = {
		from: from_address,
		to: email,
		subject: subject,
		html: finalHtml,
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
