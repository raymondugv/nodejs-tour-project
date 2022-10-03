const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const auth = require("./middleware/auth");
const app = express();

const whitelist = ["*"];
const corsOptions = {
	origin: (origin, callback) => {
		if (!origin || whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
};

app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/index"));
app.use("/users", auth, require("./routes/users"));
app.use("/countries", auth, require("./routes/countries"));
app.use("/cities", auth, require("./routes/cities"));
app.use("/tours", auth, require("./routes/tours"));
app.use(
	"/booking-informations",
	auth,
	require("./routes/booking-informations")
);
app.use(
	"/customer-informations",
	auth,
	require("./routes/customer-informations")
);

module.exports = app;
