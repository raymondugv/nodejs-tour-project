const express = require("express");
const router = express.Router();
const controller = require("../controllers/tour");
const models = require("../models");
const permission = require("../middleware/permission");

router.get("/", controller.index);
router.get("/:id", setTour, permission("read"), controller.show);
router.post("/", setTour, permission("create"), controller.create);
router.put("/:id", setTour, permission("update"), controller.update);
router.delete("/:id", setTour, permission("delete"), controller.delete);
router.post("/:id/active", setTour, permission("active"), controller.active);

async function setTour(req, res, next) {
	if (req.params.id) {
		const tour = await models.Tour.findOne({
			where: { id: req.params.id },
		});
		if (!tour) {
			res.status(404).json({ message: "Tour not found" });
		}

		req.item = tour.dataValues;
	}

	req.endpoint = "tours";
	next();
}

module.exports = router;
