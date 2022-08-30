const express = require("express");
const router = express.Router();
const controller = require("../controllers/tour");
const {
	canViewTour,
	scopedTours,
	canDeleteTour,
} = require("../permissions/tour");

router.get("/", controller.index);
router.get("/:id", authGetTour, controller.show);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

function authGetTour(req, res, next) {
	console.log(canViewTour(req.user));
	if (!canViewTour(req.user)) {
		return res.status(403).json({ message: "Forbidden" });
	}

	next();
}

module.exports = router;
