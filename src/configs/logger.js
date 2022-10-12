import { createLogger, transports, format } from "winston";

const customFormat = format.combine(
	format.timestamp(),
	format.printf((info) => {
		return `${info.timestamp} [${info.level.toUpperCase().padEnd(7)}]: ${
			info.message
		}`;
	})
);

const logger = createLogger({
	format: customFormat,
	transports: [
		new transports.File({
			filename: "./src/logs/error.log",
			level: "info",
		}),
	],
});

export default logger;
