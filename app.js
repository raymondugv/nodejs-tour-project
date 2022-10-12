import * as moduleAlias from "module-alias/register";

import express, { json, urlencoded } from "express";
// import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
require("dotenv").config();
import auth from "@middlewares/auth";
import indexRoute from "@routes/index";
import usersRoute from "@routes/users";
import customerInformationRoute from "@routes/customer-informations";
import countriesRoute from "@routes/countries";
import citiesRoute from "@routes/cities";
import toursRoute from "@routes/tours";
import bookingInformationRoute from "@routes/booking-informations";

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
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(static(join(__dirname, "public")));

app.use("/", indexRoute);
app.use("/users", auth, usersRoute);
app.use("/countries", auth, countriesRoute);
app.use("/cities", auth, citiesRoute);
app.use("/tours", auth, toursRoute);
app.use("/booking-informations", auth, bookingInformationRoute);
app.use("/customer-informations", auth, customerInformationRoute);

export default app;
