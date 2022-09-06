const express = require("express");
const router = express.Router();
const controller = require("../controllers/tour");
const models = require("../models");
const permission = require("../middleware/permission");

router.get("/", controller.index);
router.get("/:id", setTour, permission, controller.show);
router.post("/", controller.create);
router.put("/:id", setTour, permission, controller.update);
router.delete("/:id", setTour, permission, controller.delete);

async function setTour(req, res, next) {
	const tour = await models.Tour.findOne({ where: { id: req.params.id } });
	if (!tour) {
		res.status(404).json({ message: "Tour not found" });
	}

	req.item = tour.dataValues;
	next();
}

module.exports = router;
