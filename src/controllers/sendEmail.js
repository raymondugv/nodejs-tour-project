import { createTransport } from "nodemailer";
import { emailConfig, from_address } from "@config/emailConfig";
import { promises as fs } from "fs";
import { join } from "path";
import { compile } from "handlebars";
import { error, info as _info } from "@config/logger";

export default async (email, subject, emailTemplate, replacements = null) => {
	const transporter = createTransport(emailConfig);

	const templatePath = join(__dirname, emailTemplate);
	const templateFile = await fs.readFile(templatePath, "utf-8");
	const template = compile(templateFile);

	const finalHtml = template(replacements);

	const mainOptions = {
		from: from_address,
		to: email,
		subject: subject,
		html: finalHtml,
	};

	return transporter.sendMail(mainOptions, (err, info) => {
		if (err) {
			error({ err });
			return;
		} else {
			_info("Message sent: " + info.response);
			return info.response;
		}
	});
};
