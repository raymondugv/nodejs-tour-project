import cookieParser from "cookie-parser";
import cors from "cors";
import express, {json, urlencoded} from "express";
import * as moduleAlias from "module-alias/register";
import logger from "morgan";

require("dotenv").config();
import auth from "@middlewares/auth";
import indexRoute from "@routes/index";
import usersRoute from "@routes/users";
import customerInformationRoute from "@routes/customer_informations";
import countriesRoute from "@routes/countries";
import citiesRoute from "@routes/cities";
import toursRoute from "@routes/tours";
import bookingInformationRoute from "@routes/booking_informations";

const app = express();

const whitelist = [ "*" ];
const corsOptions = {
  origin : (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials : true,
};

app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({extended : false}));
app.use(cookieParser());

app.use("/", indexRoute);
app.use("/users", auth, usersRoute);
app.use("/countries", auth, countriesRoute);
app.use("/cities", auth, citiesRoute);
app.use("/tours", auth, toursRoute);
app.use("/booking-informations", auth, bookingInformationRoute);
app.use("/customer-informations", auth, customerInformationRoute);

export default app;
