const express = require("express");
const router = express.Router();
const controller = require("../controllers/tour");
const models = require("../models");
const {
  canViewTour,
  canDeleteTour,
  canEditTour,
} = require("../permissions/tour");

router.get("/", controller.index);
router.get("/:id", setTour, authGetTour, controller.show);
router.post("/", controller.create);
router.put("/:id", setTour, authEditTour, controller.update);
router.delete("/:id", setTour, authDeleteTour, controller.delete);

async function setTour(req, res, next) {
  const tour = await models.Tour.findOne({where : {id : req.params.id}});
  if (!tour) {
    res.status(404).json({message : "Tour not found"});
  }

  req.tour = tour.dataValues;
  next();
}

async function authGetTour(req, res, next) {
  if (!canViewTour(req.user, req.tour)) {
    return res.status(403).json(
        {message : "You're not allowed to see this tour"});
  }

  next();
}

async function authEditTour(req, res, next) {
  if (!canEditTour(req.user, req.tour)) {
    return res.status(403).json(
        {message : "You're not allowed to edit this tour"});
  }

  next();
}

async function authDeleteTour(req, res, next) {
  if (!canDeleteTour(req.user, req.tour)) {
    return res.status(401).json(
        {message : "You're not allowed to delete this tour"});
  }

  next();
}
module.exports = router;
