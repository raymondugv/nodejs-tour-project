const models = require("@models");
const joi = require("joi");
const {staffBookingCreated} = require("@events/StaffEvent");

const {getPagination, getPagingData} = require("@config/pagination");
const {filterFunction} = require("../config/filterAndSort");

const {
  customerBookingCreated,
  customerBookingUpdate,
} = require("@events/CustomerEvent");

const validate_schema = {
  tour_id : joi.number().required(),
  customer_id : joi.number().required(),
  number_of_pax : joi.number().required(),
  departure_date : joi.date().required(),
};

exports.index = async (req, res) => {
  try {
    const {limit, offset, page} = getPagination(req.query);
    const filter = filterFunction(req.query);

    const bookings = await models.BookingInformation.findAndCountAll({
      limit,
      offset,
      where : filter,
    });

    const response =
        getPagingData("booking-informations", bookings, page, limit);

    return res.status(200).json({booking_informations : response});
  } catch (error) {
    return res.status(500).json({error : error.message});
  }
};

exports.show = async (req, res) => {
  try {
    const booking = await models.BookingInformation.findOne({
      where : {id : req.params.id},
    });

    if (!booking)
      return res.status(404).json({message : "Booking not found"});

    return res.status(200).json({booking});
  } catch (error) {
    return res.status(500).json({error : error.message});
  }
};

exports.create = async (req, res) => {
  try {
    const data = req.body;

    const schema = joi.object().keys(validate_schema);

    const {error, value} = schema.validate(data);

    if (error) {
      return res.status(400).json({error});
    }

    const {tour_id, customer_id, number_of_pax, departure_date} = data;

    const bookingCreate = await models.BookingInformation.create({
      tour_id,
      customer_id,
      number_of_pax,
      departure_date,
      owner : req.user.id,
    });

    const booking = await models.BookingInformation.findOne({
      where : {id : bookingCreate.id},
    });

    newBookingEvent.emit("booking.created", booking);

    return res.status(201).json({message : "Booking created successfully"});
  } catch (error) {
    return res.status(500).json({error : error.message});
  }
};

exports.update = async (req, res) => {
  try {
    const data = req.body;
    const schema = joi.object().keys({
      tour_id : joi.number().required(),
      customer_id : joi.number().required(),
      number_of_pax : joi.number().required(),
      departure_date : joi.date().required(),
      booking_status : joi.number(),
      payment_status : joi.number(),
    });

    const {error, value} = schema.validate(data);

    if (error) {
      return res.status(400).json({error});
    }

    const {
      tour_id,
      customer_id,
      number_of_pax,
      departure_date,
      booking_status,
      payment_status,
    } = data;

    const booking = await models.BookingInformation.findOne({
      where : {id : req.params.id},
    });

    if (!booking)
      return res.status(404).json({message : "Booking not found"});

    booking.update({
      tour_id,
      customer_id,
      number_of_pax,
      departure_date,
      booking_status,
      payment_status,
    });

    return res.status(200).json({message : "Booking updated successfully"});
  } catch (error) {
    return res.status(500).json({error : error.message});
  }
};

exports.delete = async (req, res) => {
  try {
    const booking = await models.BookingInformation.findOne({
      where : {id : req.params.id},
    });

    if (!booking)
      return res.status(404).json({message : "Booking not found"});

    if (booking.owner !== req.user.id)
      return res.status(403).json({
        message : "You are not authorized to delete this booking",
      });

    booking.destroy();

    return res.status(200).json({message : "Booking deleted successfully"});
  } catch (error) {
    return res.status(500).json({error : error.message});
  }
};
